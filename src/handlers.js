import {
    githubGetFile, githubPutFile, githubListFiles, githubDeleteFile, githubGetFileRaw
} from './github.js';
import {
    jsonResponse, getUsersPath, getModelsPath, getUserPromptPath, getUserChatsFolder,
    getChatFilePath, generateApiKey, validateApiKey, checkDailyLimit
} from './helpers.js';

// ===== 1. المصادقة (Register / Login / Refresh Key) =====
export async function handleRegister(request, env) {
    try {
        const { username, password } = await request.json();
        if (!username || !password) return jsonResponse({ error: "username and password required" }, 400);

        const usersFile = await githubGetFile(env, getUsersPath());
        let users = {};
        if (usersFile.exists && usersFile.content) {
            try { users = JSON.parse(usersFile.content); } catch (e) { users = {}; }
        }

        if (users[username]) return jsonResponse({ error: "Username already exists" }, 400);

        const apikey = generateApiKey();
        users[username] = {
            password: password, // نص عادي (حسب الطلب)
            apikey: apikey,
            createdAt: new Date().toISOString(),
            dailyCount: 0,
            lastResetDate: new Date().toISOString().split('T')[0]
        };

        await githubPutFile(env, getUsersPath(), JSON.stringify(users, null, 2), usersFile.sha, `Register user ${username}`);

        // إنشاء المجلدات الخاصة بالمستخدم (عن طريق إنشاء ملفات وهمية ثم حذفها؟ الأسهل هو إنشاء prompt.json مباشرة)
        await githubPutFile(env, getUserPromptPath(username), JSON.stringify({ system: "You are a helpful assistant." }), null, `Init prompt for ${username}`);

        return jsonResponse({ ok: true, username, apikey });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

export async function handleLogin(request, env) {
    try {
        const { username, password } = await request.json();
        if (!username || !password) return jsonResponse({ error: "username and password required" }, 400);

        const usersFile = await githubGetFile(env, getUsersPath());
        if (!usersFile.exists) return jsonResponse({ error: "User not found" }, 404);
        const users = JSON.parse(usersFile.content);

        if (!users[username] || users[username].password !== password) {
            return jsonResponse({ error: "Invalid credentials" }, 401);
        }

        return jsonResponse({ ok: true, username, apikey: users[username].apikey });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

export async function handleRefreshKey(request, env) {
    try {
        const { username, password } = await request.json();
        if (!username || !password) return jsonResponse({ error: "username and password required" }, 400);

        const usersFile = await githubGetFile(env, getUsersPath());
        if (!usersFile.exists) return jsonResponse({ error: "User not found" }, 404);
        const users = JSON.parse(usersFile.content);

        if (!users[username] || users[username].password !== password) {
            return jsonResponse({ error: "Invalid credentials" }, 401);
        }

        const newKey = generateApiKey();
        users[username].apikey = newKey;
        await githubPutFile(env, getUsersPath(), JSON.stringify(users, null, 2), usersFile.sha, `Refresh key for ${username}`);

        return jsonResponse({ ok: true, apikey: newKey });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

// ===== 2. جلب النماذج =====
export async function handleGetModels(request, env) {
    try {
        const modelsFile = await githubGetFile(env, getModelsPath());
        if (!modelsFile.exists) {
            // إنشاء ملف افتراضي إذا لم يكن موجوداً
            const defaultModels = ["openai/gpt-4o", "openai/gpt-4o-mini", "anthropic/claude-3.5-sonnet", "meta-llama/llama-3.1-405b"];
            await githubPutFile(env, getModelsPath(), JSON.stringify(defaultModels, null, 2), null, "Init models");
            return jsonResponse({ ok: true, models: defaultModels });
        }
        const models = JSON.parse(modelsFile.content);
        return jsonResponse({ ok: true, models: Array.isArray(models) ? models : [] });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

// ===== 3. الدوال الأساسية للشات والمحادثات =====
// دالة مساعدة للتحقق من التوكن وجلب المستخدم
async function authenticateUser(env, authHeader) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { error: "Missing or invalid Authorization header. Use 'Bearer <apikey>'" };
    }
    const apikey = authHeader.split(" ")[1];
    const usersFile = await githubGetFile(env, getUsersPath());
    if (!usersFile.exists) return { error: "No users found" };
    const users = JSON.parse(usersFile.content);
    const userData = await validateApiKey(env, apikey, users);
    if (!userData) return { error: "Invalid API key" };
    return { userData, users, usersFile, usersContent: users };
}

// ===== 4. نقطة نهاية الشات الرئيسية =====
export async function handleChat(request, env) {
    try {
        // المصادقة
        const auth = await authenticateUser(env, request.headers.get("Authorization"));
        if (auth.error) return jsonResponse({ error: auth.error }, 401);
        const { userData, users, usersFile, usersContent } = auth;
        const username = userData.username;

        // جلب البيانات
        const { model, messages, conversation_id } = await request.json();
        if (!model) return jsonResponse({ error: "Model is required" }, 400);
        if (!messages || !Array.isArray(messages)) return jsonResponse({ error: "Messages array is required" }, 400);

        // التحقق من الحد اليومي
        const limit = parseInt(env.DAILY_REQUEST_LIMIT || "50");
        const dailyCheck = checkDailyLimit(userData, limit);
        if (!dailyCheck.allowed) return jsonResponse({ error: dailyCheck.message }, 429);

        // التحقق من عدد المحادثات (إذا كانت جديدة)
        const chatFolder = getUserChatsFolder(username);
        const listRes = await githubListFiles(env, chatFolder);
        const maxChats = parseInt(env.MAX_CHATS_PER_USER || "20");

        let chatId = conversation_id;
        let isNew = false;
        if (!chatId) {
            // إنشاء محادثة جديدة
            if (listRes.files.length >= maxChats) {
                return jsonResponse({ error: `وصلت للحد الأقصى من المحادثات (${maxChats}). قم بحذف بعض المحادثات القديمة.` }, 400);
            }
            chatId = `conv_${Date.now()}`;
            isNew = true;
        }

        // جلب الـ System Prompt الخاص بالمستخدم
        const promptFile = await githubGetFile(env, getUserPromptPath(username));
        let systemPrompt = "You are a helpful assistant.";
        if (promptFile.exists && promptFile.content) {
            try {
                const pData = JSON.parse(promptFile.content);
                if (pData.system) systemPrompt = pData.system;
            } catch (e) { }
        }

        // تحضير الرسائل لإرسالها إلى OpenRouter
        const openRouterMessages = [{ role: "system", content: systemPrompt }, ...messages];

        // الاتصال بـ OpenRouter
        const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://your-domain.com", // اختياري
                "X-Title": "AI Proxy" // اختياري
            },
            body: JSON.stringify({
                model: model,
                messages: openRouterMessages,
                stream: false // جعلها غير تدفقية للتبسيط، يمكن تفعيلها لاحقاً
            })
        });

        if (!openRouterRes.ok) {
            const errText = await openRouterRes.text();
            return jsonResponse({ error: `OpenRouter error: ${openRouterRes.status} - ${errText}` }, openRouterRes.status);
        }

        const openRouterData = await openRouterRes.json();
        const assistantMessage = openRouterData.choices?.[0]?.message;

        if (!assistantMessage) {
            return jsonResponse({ error: "No response from OpenRouter" }, 500);
        }

        // تحديث عداد المستخدم
        usersContent[username].dailyCount = (usersContent[username].dailyCount || 0) + 1;
        await githubPutFile(env, getUsersPath(), JSON.stringify(usersContent, null, 2), usersFile.sha, `Update count for ${username}`);

        // حفظ المحادثة
        const chatFilePath = getChatFilePath(username, chatId);
        let existingChat = [];
        if (!isNew) {
            const existingFile = await githubGetFile(env, chatFilePath);
            if (existingFile.exists && existingFile.content) {
                try { existingChat = JSON.parse(existingFile.content); } catch (e) { existingChat = []; }
            }
        }
        // إضافة الرسائل الجديدة (الرسالة الأصلية ورد المساعد)
        const userMsg = messages[messages.length - 1]; // آخر رسالة من المستخدم
        if (userMsg && userMsg.role === "user") {
            existingChat.push(userMsg);
        }
        existingChat.push({ role: "assistant", content: assistantMessage.content });

        await githubPutFile(env, chatFilePath, JSON.stringify(existingChat, null, 2), null, `Update chat ${chatId}`);

        // إرجاع الرد مع معرف المحادثة
        return jsonResponse({
            ok: true,
            conversation_id: chatId,
            message: assistantMessage,
            usage: openRouterData.usage || null
        });

    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

// ===== 5. جلب قائمة المحادثات =====
export async function handleListConversations(request, env) {
    try {
        const auth = await authenticateUser(env, request.headers.get("Authorization"));
        if (auth.error) return jsonResponse({ error: auth.error }, 401);
        const { userData } = auth;
        const username = userData.username;

        const chatFolder = getUserChatsFolder(username);
        const { files, exists } = await githubListFiles(env, chatFolder);
        if (!exists) return jsonResponse({ ok: true, conversations: [] });

        // ترتيب حسب تاريخ التعديل (الأحدث أولاً)
        const convs = files
            .filter(f => f.name.endsWith('.json'))
            .map(f => ({
                id: f.name.replace('.json', ''),
                name: f.name,
                updated_at: f.sha // يمكننا استخدام sha كمرجع، أو جلب الملف لقراءة الوقت
            }))
            .sort((a, b) => b.id.localeCompare(a.id)); // ترتيب تنازلي حسب timestamp

        return jsonResponse({ ok: true, conversations: convs });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

// ===== 6. جلب محادثة محددة =====
export async function handleGetConversation(request, env, conversationId) {
    try {
        const auth = await authenticateUser(env, request.headers.get("Authorization"));
        if (auth.error) return jsonResponse({ error: auth.error }, 401);
        const { userData } = auth;
        const username = userData.username;

        const chatFilePath = getChatFilePath(username, conversationId);
        const file = await githubGetFile(env, chatFilePath);
        if (!file.exists) return jsonResponse({ error: "Conversation not found" }, 404);

        const messages = JSON.parse(file.content);
        return jsonResponse({ ok: true, conversation_id: conversationId, messages });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

// ===== 7. حذف محادثة =====
export async function handleDeleteConversation(request, env, conversationId) {
    try {
        const auth = await authenticateUser(env, request.headers.get("Authorization"));
        if (auth.error) return jsonResponse({ error: auth.error }, 401);
        const { userData } = auth;
        const username = userData.username;

        const chatFilePath = getChatFilePath(username, conversationId);
        const file = await githubGetFileRaw(env, chatFilePath);
        if (!file.exists) return jsonResponse({ error: "Conversation not found" }, 404);

        await githubDeleteFile(env, chatFilePath, file.sha, `Delete chat ${conversationId}`);
        return jsonResponse({ ok: true });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

// ===== 8. جلب وحفظ الـ System Prompt =====
export async function handleGetPrompt(request, env) {
    try {
        const auth = await authenticateUser(env, request.headers.get("Authorization"));
        if (auth.error) return jsonResponse({ error: auth.error }, 401);
        const { userData } = auth;
        const username = userData.username;

        const promptPath = getUserPromptPath(username);
        const file = await githubGetFile(env, promptPath);
        if (!file.exists) {
            return jsonResponse({ ok: true, system: "You are a helpful assistant." });
        }
        const data = JSON.parse(file.content);
        return jsonResponse({ ok: true, system: data.system || "" });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}

export async function handleSavePrompt(request, env) {
    try {
        const auth = await authenticateUser(env, request.headers.get("Authorization"));
        if (auth.error) return jsonResponse({ error: auth.error }, 401);
        const { userData } = auth;
        const username = userData.username;

        const { system } = await request.json();
        if (typeof system !== 'string') return jsonResponse({ error: "System prompt must be a string" }, 400);

        const promptPath = getUserPromptPath(username);
        const current = await githubGetFile(env, promptPath);
        await githubPutFile(env, promptPath, JSON.stringify({ system }, null, 2), current.sha, `Update prompt for ${username}`);

        return jsonResponse({ ok: true });
    } catch (err) {
        return jsonResponse({ error: String(err.message || err) }, 500);
    }
}