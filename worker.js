// worker.js - المدخل الرئيسي
import { HTML_PAGE } from './src/html.js';

import {
    handleRegister,
    handleLogin,
    handleRefreshKey,
    handleGetModels,
    handleChat,
    handleListConversations,
    handleGetConversation,
    handleDeleteConversation,
    handleGetPrompt,
    handleSavePrompt
} from './src/handlers.js';

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // ===== الصفحة الرئيسية =====
        if (path === "/" && request.method === "GET") {
            return new Response(HTML_PAGE, { headers: { "Content-Type": "text/html; charset=utf-8" } });
        }

        // ===== المصادقة =====
        if (path === "/api/auth/register" && request.method === "POST") return handleRegister(request, env);
        if (path === "/api/auth/login" && request.method === "POST") return handleLogin(request, env);
        if (path === "/api/auth/refresh-key" && request.method === "POST") return handleRefreshKey(request, env);

        // ===== النماذج =====
        if (path === "/api/models" && request.method === "GET") return handleGetModels(request, env);

        // ===== الشات =====
        if (path === "/api/chat" && request.method === "POST") return handleChat(request, env);

        // ===== المحادثات =====
        if (path === "/api/conversations" && request.method === "GET") return handleListConversations(request, env);

        // المسارات الديناميكية (/:id)
        if (path.startsWith("/api/conversation/")) {
            const parts = path.split('/');
            const id = parts[parts.length - 1];
            if (request.method === "GET") return handleGetConversation(request, env, id);
            if (request.method === "DELETE") return handleDeleteConversation(request, env, id);
        }

        // ===== الـ System Prompt =====
        if (path === "/api/user/prompt" && request.method === "GET") return handleGetPrompt(request, env);
        if (path === "/api/user/prompt" && request.method === "POST") return handleSavePrompt(request, env);

        return new Response("Not found", { status: 404 });
    }
};