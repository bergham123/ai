// ===== دوال GitHub الأساسية =====
export function ghHeaders(env) {
    return {
        "Authorization": "Bearer " + env.GITHUB_TOKEN,
        "User-Agent": "cf-worker-ai-proxy",
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
    };
}

// ===== دوال الترميز =====
export function utf8ToBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

export function base64ToUtf8(b64) {
    return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
}

// ===== دوال الاستجابة =====
export function jsonResponse(obj, status = 200) {
    return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json; charset=utf-8" } });
}

// ===== دوال المستخدمين والمسارات =====
export function getUsersPath() {
    return "users.json";
}

export function getModelsPath() {
    return "models.json";
}

export function getUserRoot(username) {
    return `data/users/${username}`;
}

export function getUserPromptPath(username) {
    return `${getUserRoot(username)}/prompt.json`;
}

export function getUserChatsFolder(username) {
    return `${getUserRoot(username)}/chats`;
}

export function getChatFilePath(username, chatId) {
    return `${getUserChatsFolder(username)}/${chatId}.json`;
}

// ===== توليد مفتاح عشوائي =====
export function generateApiKey() {
    return "sk-" + crypto.randomUUID().replace(/-/g, "");
}

// ===== التحقق من صحة المفتاح وجلب بيانات المستخدم =====
export async function validateApiKey(env, apiKey, usersData) {
    if (!apiKey) return null;
    for (const [username, data] of Object.entries(usersData)) {
        if (data.apikey === apiKey) {
            return { username, ...data };
        }
    }
    return null;
}

// ===== التحقق من الحد اليومي =====
export function checkDailyLimit(userData, limit) {
    const today = new Date().toISOString().split('T')[0];
    if (userData.lastResetDate !== today) {
        userData.dailyCount = 0;
        userData.lastResetDate = today;
    }
    if (userData.dailyCount >= limit) {
        return { allowed: false, message: `تم تجاوز الحد اليومي (${limit} طلب). سيتم إعادة التعيين غداً.` };
    }
    return { allowed: true };
}


export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}
