// worker.js - المدخل الرئيسي مع دعم CORS
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

// ===== دالة مساعدة لإضافة رؤوس CORS إلى الردود =====
function addCorsHeaders(response) {
  // إذا كان response هو كائن Response
  if (response instanceof Response) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    newHeaders.set('Access-Control-Max-Age', '86400');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
  
  // إذا كان response هو كائن JavaScript (غير Response)
  const body = typeof response === 'string' ? response : JSON.stringify(response);
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // ===== معالجة طلبات OPTIONS (preflight) =====
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    // ===== الصفحة الرئيسية =====
    if (path === "/" && method === "GET") {
      return new Response(HTML_PAGE, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // ===== المصادقة =====
    if (path === "/api/auth/register" && method === "POST") {
      const result = await handleRegister(request, env);
      return addCorsHeaders(result);
    }
    if (path === "/api/auth/login" && method === "POST") {
      const result = await handleLogin(request, env);
      return addCorsHeaders(result);
    }
    if (path === "/api/auth/refresh-key" && method === "POST") {
      const result = await handleRefreshKey(request, env);
      return addCorsHeaders(result);
    }

    // ===== النماذج =====
    if (path === "/api/models" && method === "GET") {
      const result = await handleGetModels(request, env);
      return addCorsHeaders(result);
    }

    // ===== الشات =====
    if (path === "/api/chat" && method === "POST") {
      const result = await handleChat(request, env);
      return addCorsHeaders(result);
    }

    // ===== المحادثات =====
    if (path === "/api/conversations" && method === "GET") {
      const result = await handleListConversations(request, env);
      return addCorsHeaders(result);
    }

    // ===== المسارات الديناميكية للمحادثات =====
    if (path.startsWith("/api/conversation/")) {
      const parts = path.split('/');
      const id = parts[parts.length - 1];
      if (method === "GET") {
        const result = await handleGetConversation(request, env, id);
        return addCorsHeaders(result);
      }
      if (method === "DELETE") {
        const result = await handleDeleteConversation(request, env, id);
        return addCorsHeaders(result);
      }
    }

    // ===== الـ System Prompt =====
    if (path === "/api/user/prompt" && method === "GET") {
      const result = await handleGetPrompt(request, env);
      return addCorsHeaders(result);
    }
    if (path === "/api/user/prompt" && method === "POST") {
      const result = await handleSavePrompt(request, env);
      return addCorsHeaders(result);
    }

    // ===== إذا لم يجد أي مسار =====
    return new Response("Not found", {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
