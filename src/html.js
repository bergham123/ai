export const HTML_PAGE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Proxy - Modern UI</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    /* ===== RESET & BASE ===== */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg-body: #0A0A0A;
      --bg-sidebar: #111111;
      --bg-card: #1A1A1A;
      --bg-input: #1E1E1E;
      --border-color: #2A2A2A;
      --text-primary: #F0F0F0;
      --text-secondary: #A0A0A0;
      --text-muted: #6B6B6B;
      --accent: #10A37F;         /* أخضر ChatGPT */
      --accent-hover: #1A9E7A;
      --shadow: 0 8px 32px rgba(0,0,0,0.6);
      --radius: 14px;
      --transition: 0.2s ease;
    }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg-body);
      color: var(--text-primary);
      display: flex;
      height: 100vh;
      overflow: hidden;
      direction: rtl;
    }

    /* ===== SIDEBAR ===== */
    .sidebar {
      width: 280px;
      background: var(--bg-sidebar);
      border-left: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      height: 100vh;
      padding: 20px 16px;
      flex-shrink: 0;
    }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
    }
    .sidebar-header h1 {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .sidebar-header h1 i {
      color: var(--accent);
      font-size: 24px;
    }
    .new-chat-btn {
      background: var(--accent);
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 8px 16px;
      font-weight: 600;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: var(--transition);
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
    }
    .new-chat-btn:hover {
      background: var(--accent-hover);
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(16, 163, 127, 0.3);
    }

    .conversation-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-top: 8px;
    }
    .conv-item {
      background: var(--bg-card);
      padding: 12px 14px;
      border-radius: var(--radius);
      border: 1px solid transparent;
      cursor: pointer;
      transition: var(--transition);
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--text-secondary);
    }
    .conv-item:hover {
      border-color: var(--accent);
      background: #1E2A2A;
      color: var(--text-primary);
    }
    .conv-item.active {
      border-color: var(--accent);
      background: #1E2A2A;
      color: var(--text-primary);
    }
    .conv-item .del-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: var(--transition);
    }
    .conv-item .del-btn:hover {
      color: #E74C3C;
      background: rgba(231, 76, 60, 0.15);
    }

    /* ===== MAIN ===== */
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: var(--bg-body);
      padding: 0 28px 20px 28px;
    }

    /* ===== TOP BAR ===== */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
      gap: 12px;
    }
    .auth-area {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .auth-area input {
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      padding: 8px 14px;
      border-radius: 30px;
      width: 140px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      transition: var(--transition);
    }
    .auth-area input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.2);
    }
    .auth-area button {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      padding: 8px 16px;
      border-radius: 30px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      transition: var(--transition);
      font-size: 14px;
    }
    .auth-area button:hover {
      background: var(--border-color);
      color: var(--text-primary);
    }
    .auth-area .btn-primary {
      background: var(--accent);
      color: #fff;
      border: none;
    }
    .auth-area .btn-primary:hover {
      background: var(--accent-hover);
      box-shadow: 0 4px 12px rgba(16, 163, 127, 0.3);
    }
    .model-selector select {
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      padding: 8px 18px;
      border-radius: 30px;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      min-width: 160px;
      font-size: 14px;
      transition: var(--transition);
    }
    .model-selector select:focus {
      outline: none;
      border-color: var(--accent);
    }
    .api-key-display {
      background: var(--bg-card);
      padding: 4px 14px;
      border-radius: 30px;
      font-size: 13px;
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .api-key-display span {
      color: var(--text-primary);
      font-family: monospace;
      letter-spacing: 0.5px;
    }

    /* ===== CHAT CONTAINER ===== */
    .chat-container {
      flex: 1;
      overflow-y: auto;
      padding: 24px 0;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .message {
      max-width: 80%;
      padding: 14px 20px;
      border-radius: 20px;
      word-wrap: break-word;
      line-height: 1.7;
      font-size: 15px;
      position: relative;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .message.user {
      align-self: flex-end;
      background: var(--accent);
      color: #fff;
      border-bottom-left-radius: 6px;
    }
    .message.assistant {
      align-self: flex-start;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-bottom-right-radius: 6px;
    }
    .message .role-badge {
      font-size: 11px;
      opacity: 0.7;
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    .message.user .role-badge { color: rgba(255,255,255,0.8); }
    .message.assistant .role-badge { color: var(--text-muted); }

    /* ===== INPUT AREA ===== */
    .input-area {
      display: flex;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
      align-items: flex-end;
    }
    .input-area textarea {
      flex: 1;
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      border-radius: 30px;
      color: var(--text-primary);
      padding: 14px 20px;
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      resize: vertical;
      min-height: 52px;
      max-height: 150px;
      transition: var(--transition);
    }
    .input-area textarea:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.15);
    }
    .input-area button {
      background: var(--accent);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 52px;
      height: 52px;
      font-weight: 600;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .input-area button:hover {
      background: var(--accent-hover);
      transform: scale(1.05);
      box-shadow: 0 4px 16px rgba(16, 163, 127, 0.4);
    }
    .input-area button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    /* ===== BOTTOM STATUS & TOOLS ===== */
    .bottom-tools {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
    }
    .status-msg {
      font-size: 13px;
      color: var(--text-secondary);
      padding: 4px 0;
    }
    .status-msg.error { color: #E74C3C; }
    .status-msg.success { color: var(--accent); }
    .prompt-trigger {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 13px;
      font-family: 'Inter', sans-serif;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: var(--transition);
    }
    .prompt-trigger:hover {
      color: var(--text-primary);
    }

    /* ===== MODAL ===== */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    .modal-overlay.active { display: flex; }
    .modal-box {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 28px;
      width: 90%;
      max-width: 540px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      box-shadow: var(--shadow);
    }
    .modal-box h3 {
      color: var(--text-primary);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .modal-box h3 i { color: var(--accent); }
    .modal-box textarea {
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      padding: 14px;
      border-radius: 10px;
      font-family: 'Inter', sans-serif;
      min-height: 120px;
      width: 100%;
      font-size: 14px;
      line-height: 1.6;
      transition: var(--transition);
    }
    .modal-box textarea:focus {
      outline: none;
      border-color: var(--accent);
    }
    .modal-box .btn-row {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
    .modal-box .btn-row button {
      padding: 10px 24px;
      border-radius: 30px;
      border: none;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      font-size: 14px;
    }
    .modal-box .btn-row .cancel-btn {
      background: var(--border-color);
      color: var(--text-secondary);
    }
    .modal-box .btn-row .cancel-btn:hover {
      background: #3A3A3A;
    }
    .modal-box .btn-row .save-btn {
      background: var(--accent);
      color: #fff;
    }
    .modal-box .btn-row .save-btn:hover {
      background: var(--accent-hover);
      box-shadow: 0 4px 12px rgba(16, 163, 127, 0.3);
    }

    /* ===== SCROLLBAR ===== */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #3A3A3A; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1024px) {
      .sidebar { width: 100%; height: auto; border-left: none; border-bottom: 1px solid var(--border-color); }
      .main { padding: 0 16px 16px 16px; }
      .auth-area input { width: 110px; }
    }
    @media (max-width: 600px) {
      .sidebar { padding: 12px; }
      .top-bar { flex-direction: column; align-items: stretch; }
      .auth-area { justify-content: center; }
      .model-selector select { width: 100%; }
      .message { max-width: 95%; }
    }
  </style>
</head>
<body>

<!-- ===== SIDEBAR ===== -->
<aside class="sidebar">
  <div class="sidebar-header">
    <h1><i class="fas fa-brain"></i> AI Proxy</h1>
    <button class="new-chat-btn" id="newChatBtn"><i class="fas fa-plus"></i> جديد</button>
  </div>
  <div class="conversation-list" id="conversationList">
    <div style="color: var(--text-muted); text-align: center; padding: 20px; font-size: 14px;">
      سجل الدخول لعرض المحادثات
    </div>
  </div>
</aside>

<!-- ===== MAIN ===== -->
<main class="main">

  <!-- Top Bar -->
  <div class="top-bar">
    <div class="auth-area" id="authArea">
      <input type="text" id="usernameInput" placeholder="اسم المستخدم" dir="ltr">
      <input type="password" id="passwordInput" placeholder="كلمة المرور" dir="ltr">
      <button class="btn-primary" id="loginBtn">تسجيل دخول</button>
      <button id="registerBtn">تسجيل جديد</button>
      <button id="refreshKeyBtn" style="display:none;" class="btn-primary"><i class="fas fa-key"></i> تجديد</button>
      <span id="apiKeyDisplay" class="api-key-display" style="display:none;">
        <i class="fas fa-key"></i> <span id="apiKeyText">...</span>
      </span>
    </div>
    <div class="model-selector">
      <select id="modelSelect">
        <option value="">جاري التحميل...</option>
      </select>
    </div>
  </div>

  <!-- Chat Messages -->
  <div class="chat-container" id="chatContainer">
    <div style="color: var(--text-muted); text-align: center; padding: 60px 20px; align-self: center; max-width: 400px;">
      <i class="fas fa-comment-dots" style="font-size: 42px; display: block; margin-bottom: 16px; opacity: 0.3;"></i>
      <p style="font-size: 18px; font-weight: 500;">أهلاً بك!</p>
      <p style="font-size: 14px; margin-top: 6px;">سجل الدخول أو سجل جديد وابدأ المحادثة.</p>
    </div>
  </div>

  <!-- Input Area -->
  <div class="input-area">
    <textarea id="messageInput" rows="1" placeholder="اكتب رسالتك هنا..." dir="auto"></textarea>
    <button id="sendBtn"><i class="fas fa-paper-plane"></i></button>
  </div>

  <!-- Bottom Tools -->
  <div class="bottom-tools">
    <span class="status-msg" id="statusMsg"></span>
    <button class="prompt-trigger" id="openPromptModalBtn">
      <i class="fas fa-edit"></i> تعديل التعليمات
    </button>
  </div>
</main>

<!-- ===== MODAL ===== -->
<div class="modal-overlay" id="promptModal">
  <div class="modal-box">
    <h3><i class="fas fa-robot"></i> تعليمات النظام (System Prompt)</h3>
    <textarea id="promptTextarea" placeholder="مثال: أنت مساعد ذكي متخصص في البرمجة..."></textarea>
    <div class="btn-row">
      <button class="cancel-btn" onclick="closePromptModal()">إلغاء</button>
      <button class="save-btn" id="savePromptBtn">حفظ</button>
    </div>
  </div>
</div>

<script>
// ============================================================
//  كل الكود (JavaScript) يبقى كما هو تماماً، دون أي تغيير.
//  لقد تم الحفاظ على جميع المتغيرات والدوال والأحداث.
// ============================================================

var state = {
  username: null,
  apikey: null,
  currentConversationId: null,
  messages: [],
  model: null,
  isLoading: false
};

var usernameInput = document.getElementById('usernameInput');
var passwordInput = document.getElementById('passwordInput');
var loginBtn = document.getElementById('loginBtn');
var registerBtn = document.getElementById('registerBtn');
var refreshKeyBtn = document.getElementById('refreshKeyBtn');
var apiKeyDisplay = document.getElementById('apiKeyDisplay');
var apiKeyText = document.getElementById('apiKeyText');
var modelSelect = document.getElementById('modelSelect');
var chatContainer = document.getElementById('chatContainer');
var messageInput = document.getElementById('messageInput');
var sendBtn = document.getElementById('sendBtn');
var statusMsg = document.getElementById('statusMsg');
var conversationList = document.getElementById('conversationList');
var newChatBtn = document.getElementById('newChatBtn');
var promptModal = document.getElementById('promptModal');
var promptTextarea = document.getElementById('promptTextarea');
var savePromptBtn = document.getElementById('savePromptBtn');
var openPromptModalBtn = document.getElementById('openPromptModalBtn');

function setStatus(msg, type) {
  if (typeof type === 'undefined') type = '';
  statusMsg.textContent = msg;
  statusMsg.className = 'status-msg ' + type;
}
function getAuthHeader() {
  if (!state.apikey) return null;
  return 'Bearer ' + state.apikey;
}

function renderMessages() {
  if (state.messages.length === 0) {
    chatContainer.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 60px 20px; align-self: center; max-width: 400px;"><i class="fas fa-comment-dots" style="font-size: 42px; display: block; margin-bottom: 16px; opacity: 0.3;"></i><p style="font-size: 18px; font-weight: 500;">لا توجد رسائل</p><p style="font-size: 14px; margin-top: 6px;">ابدأ المحادثة الآن!</p></div>';
    return;
  }
  var html = '';
  for (var i = 0; i < state.messages.length; i++) {
    var msg = state.messages[i];
    var isUser = (msg.role === 'user');
    html += '<div class="message ' + (isUser ? 'user' : 'assistant') + '">' +
      '<span class="role-badge">' + (isUser ? '🧑 أنت' : '🤖 المساعد') + '</span>' +
      msg.content +
      '</div>';
  }
  chatContainer.innerHTML = html;
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function loadModels() {
  try {
    var res = await fetch('/api/models');
    var data = await res.json();
    if (data.ok) {
      var optionsHtml = '';
      for (var i = 0; i < data.models.length; i++) {
        var m = data.models[i];
        optionsHtml += '<option value="' + m.id + '">' + m.name + '</option>';
      }
      modelSelect.innerHTML = optionsHtml;
      if (data.models.length > 0) {
        state.model = data.models[0].id;
      }
    }
  } catch (e) { console.error('Models load error', e); }
}

async function loadConversations() {
  if (!state.apikey) return;
  try {
    var res = await fetch('/api/conversations', { headers: { 'Authorization': getAuthHeader() } });
    var data = await res.json();
    if (data.ok) {
      if (data.conversations.length === 0) {
        conversationList.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 20px; font-size: 14px;">لا توجد محادثات. ابدأ محادثة جديدة!</div>';
        return;
      }
      var html = '';
      for (var i = 0; i < data.conversations.length; i++) {
        var conv = data.conversations[i];
        html += '<div class="conv-item" data-id="' + conv.id + '">' +
          '<span>' + conv.id.replace('conv_', '').slice(0, 12) + '</span>' +
          '<button class="del-btn" data-id="' + conv.id + '"><i class="fas fa-trash"></i></button>' +
          '</div>';
      }
      conversationList.innerHTML = html;

      var items = document.querySelectorAll('.conv-item');
      for (var j = 0; j < items.length; j++) {
        var el = items[j];
        el.addEventListener('click', function(e) {
          if (e.target.closest('.del-btn')) return;
          var id = this.dataset.id;
          loadConversation(id);
        });
        var delBtn = el.querySelector('.del-btn');
        if (delBtn) {
          delBtn.addEventListener('click', async function(e) {
            e.stopPropagation();
            var id = this.dataset.id;
            if (!confirm('حذف هذه المحادثة؟')) return;
            try {
              var resDel = await fetch('/api/conversation/' + id, { method: 'DELETE', headers: { 'Authorization': getAuthHeader() } });
              var dataDel = await resDel.json();
              if (dataDel.ok) {
                setStatus('تم الحذف', 'success');
                loadConversations();
                if (state.currentConversationId === id) {
                  state.currentConversationId = null;
                  state.messages = [];
                  renderMessages();
                }
              } else { setStatus('خطأ: ' + dataDel.error, 'error'); }
            } catch (err) { setStatus('خطأ: ' + err.message, 'error'); }
          });
        }
      }
    }
  } catch (e) { setStatus('خطأ في جلب المحادثات: ' + e.message, 'error'); }
}

async function loadConversation(id) {
  if (!state.apikey) return;
  try {
    var res = await fetch('/api/conversation/' + id, { headers: { 'Authorization': getAuthHeader() } });
    var data = await res.json();
    if (data.ok) {
      state.currentConversationId = data.conversation_id;
      state.messages = data.messages || [];
      renderMessages();
      var items = document.querySelectorAll('.conv-item');
      for (var i = 0; i < items.length; i++) items[i].classList.remove('active');
      var activeEl = document.querySelector('.conv-item[data-id="' + id + '"]');
      if (activeEl) activeEl.classList.add('active');
      setStatus('تم تحميل المحادثة', 'success');
    } else {
      setStatus('خطأ: ' + data.error, 'error');
    }
  } catch (e) { setStatus('خطأ: ' + e.message, 'error'); }
}

async function sendMessage() {
  if (state.isLoading) return;
  var text = messageInput.value.trim();
  if (!text) return;
  if (!state.apikey) { setStatus('الرجاء تسجيل الدخول أولاً', 'error'); return; }
  if (!state.model) { setStatus('الرجاء اختيار نموذج', 'error'); return; }

  state.messages.push({ role: 'user', content: text });
  renderMessages();
  messageInput.value = '';
  setStatus('جاري التفكير...', '');
  state.isLoading = true;
  sendBtn.disabled = true;

  try {
    var payload = {
      model: state.model,
      messages: state.messages.filter(function(m) { return m.role !== 'system'; }),
      conversation_id: state.currentConversationId || undefined
    };

    var res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader()
      },
      body: JSON.stringify(payload)
    });

    var data = await res.json();
    if (data.ok) {
      if (data.conversation_id && !state.currentConversationId) {
        state.currentConversationId = data.conversation_id;
        loadConversations();
      }
      state.messages.push({ role: 'assistant', content: data.message.content });
      renderMessages();
      setStatus('تم الإرسال ✓', 'success');
    } else {
      setStatus('خطأ: ' + data.error, 'error');
    }
  } catch (err) {
    setStatus('خطأ: ' + err.message, 'error');
  } finally {
    state.isLoading = false;
    sendBtn.disabled = false;
    messageInput.focus();
  }
}

async function login() {
  var username = usernameInput.value.trim();
  var password = passwordInput.value.trim();
  if (!username || !password) { setStatus('املأ جميع الحقول', 'error'); return; }
  try {
    var res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    });
    var data = await res.json();
    if (data.ok) {
      state.username = data.username;
      state.apikey = data.apikey;
      updateUIAfterAuth();
      setStatus('مرحباً ' + data.username, 'success');
      loadConversations();
      loadModels();
      loadPrompt();
    } else {
      setStatus('خطأ: ' + data.error, 'error');
    }
  } catch (e) { setStatus('خطأ: ' + e.message, 'error'); }
}

async function register() {
  var username = usernameInput.value.trim();
  var password = passwordInput.value.trim();
  if (!username || !password) { setStatus('املأ جميع الحقول', 'error'); return; }
  try {
    var res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    });
    var data = await res.json();
    if (data.ok) {
      state.username = data.username;
      state.apikey = data.apikey;
      updateUIAfterAuth();
      setStatus('تم التسجيل بنجاح!', 'success');
      loadConversations();
      loadModels();
      loadPrompt();
    } else {
      setStatus('خطأ: ' + data.error, 'error');
    }
  } catch (e) { setStatus('خطأ: ' + e.message, 'error'); }
}

async function refreshKey() {
  var username = usernameInput.value.trim();
  var password = passwordInput.value.trim();
  if (!username || !password) { setStatus('أدخل اسم المستخدم وكلمة المرور لتجديد المفتاح', 'error'); return; }
  try {
    var res = await fetch('/api/auth/refresh-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    });
    var data = await res.json();
    if (data.ok) {
      state.apikey = data.apikey;
      apiKeyText.textContent = state.apikey;
      setStatus('تم تجديد المفتاح ✓', 'success');
    } else {
      setStatus('خطأ: ' + data.error, 'error');
    }
  } catch (e) { setStatus('خطأ: ' + e.message, 'error'); }
}

function updateUIAfterAuth() {
  apiKeyDisplay.style.display = 'flex';
  apiKeyText.textContent = state.apikey;
  refreshKeyBtn.style.display = 'inline-block';
  loginBtn.style.display = 'none';
  registerBtn.style.display = 'none';
  registerBtn.textContent = 'تسجيل خروج';
  registerBtn.onclick = function() {
    state.username = null; state.apikey = null; state.messages = [];
    apiKeyDisplay.style.display = 'none';
    refreshKeyBtn.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    registerBtn.textContent = 'تسجيل جديد';
    registerBtn.onclick = register;
    chatContainer.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 60px 20px; align-self: center; max-width: 400px;"><i class="fas fa-comment-dots" style="font-size: 42px; display: block; margin-bottom: 16px; opacity: 0.3;"></i><p style="font-size: 18px; font-weight: 500;">تم تسجيل الخروج</p></div>';
    conversationList.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 20px; font-size: 14px;">سجل الدخول لعرض المحادثات</div>';
    setStatus('تم تسجيل الخروج', '');
  };
}

async function loadPrompt() {
  if (!state.apikey) return;
  try {
    var res = await fetch('/api/user/prompt', { headers: { 'Authorization': getAuthHeader() } });
    var data = await res.json();
    if (data.ok) {
      promptTextarea.value = data.system || '';
    }
  } catch (e) {}
}

async function savePrompt() {
  if (!state.apikey) { setStatus('الرجاء تسجيل الدخول', 'error'); return; }
  try {
    var res = await fetch('/api/user/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': getAuthHeader() },
      body: JSON.stringify({ system: promptTextarea.value })
    });
    var data = await res.json();
    if (data.ok) {
      setStatus('تم حفظ التعليمات ✓', 'success');
      closePromptModal();
    } else {
      setStatus('خطأ: ' + data.error, 'error');
    }
  } catch (e) { setStatus('خطأ: ' + e.message, 'error'); }
}

function openPromptModal() {
  if (!state.apikey) { setStatus('سجل الدخول أولاً', 'error'); return; }
  promptModal.classList.add('active');
}
function closePromptModal() { promptModal.classList.remove('active'); }
window.closePromptModal = closePromptModal;

loginBtn.onclick = login;
registerBtn.onclick = register;
refreshKeyBtn.onclick = refreshKey;
sendBtn.onclick = sendMessage;
newChatBtn.onclick = function() {
  if (!state.apikey) { setStatus('سجل الدخول أولاً', 'error'); return; }
  state.currentConversationId = null;
  state.messages = [];
  renderMessages();
  setStatus('محادثة جديدة', 'success');
  var items = document.querySelectorAll('.conv-item');
  for (var i = 0; i < items.length; i++) items[i].classList.remove('active');
};
openPromptModalBtn.onclick = openPromptModal;
savePromptBtn.onclick = savePrompt;

messageInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

modelSelect.onchange = function(e) { state.model = e.target.value; };

loadModels();
console.log('AI Proxy ready!');
</script>
</body>
</html>`;
