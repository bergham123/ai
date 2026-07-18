export const HTML_PAGE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Proxy - DeepSeek Style</title>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    /* (نفس الأنماط السابقة، احتفظ بها كما هي) */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg-main: #0D1117;
      --bg-sidebar: #161B22;
      --bg-card: #1C2333;
      --border-color: #30363D;
      --text-main: #E6EDF3;
      --text-muted: #8B949E;
      --accent: #58A6FF;
      --accent-hover: #79C0FF;
      --input-bg: #0D1117;
      --shadow: 0 4px 12px rgba(0,0,0,0.5);
    }
    body {
      font-family: 'Tajawal', sans-serif;
      background: var(--bg-main);
      color: var(--text-main);
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .sidebar {
      width: 280px;
      background: var(--bg-sidebar);
      border-left: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      height: 100vh;
      padding: 16px;
      flex-shrink: 0;
    }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
    }
    .sidebar-header h1 { font-size: 18px; font-weight: 700; color: var(--accent); }
    .sidebar-header h1 i { margin-left: 8px; }
    .new-chat-btn {
      background: var(--accent);
      color: #0D1117;
      border: none;
      border-radius: 8px;
      padding: 8px 12px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Tajawal';
      transition: 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .new-chat-btn:hover { background: var(--accent-hover); transform: scale(1.02); }
    .conversation-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
    }
    .conv-item {
      background: var(--bg-card);
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      cursor: pointer;
      transition: 0.2s;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .conv-item:hover { border-color: var(--accent); background: #1C2A3A; }
    .conv-item.active { border-color: var(--accent); background: #1C2A3A; }
    .conv-item .del-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
    }
    .conv-item .del-btn:hover { color: #F85149; background: #2D1B1B; }
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: var(--bg-main);
      padding: 0 20px 20px 20px;
    }
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
      gap: 12px;
      flex-wrap: wrap;
    }
    .auth-area input {
      background: var(--input-bg);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 8px 12px;
      border-radius: 6px;
      width: 130px;
      font-family: 'Tajawal';
    }
    .auth-area input:focus { outline: none; border-color: var(--accent); }
    .auth-area button {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-family: 'Tajawal';
      transition: 0.2s;
      font-weight: 500;
    }
    .auth-area button:hover { background: var(--border-color); }
    .auth-area .btn-primary { background: var(--accent); color: #0D1117; border: none; }
    .auth-area .btn-primary:hover { background: var(--accent-hover); }
    .model-selector select {
      background: var(--input-bg);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 8px 16px;
      border-radius: 6px;
      font-family: 'Tajawal';
      cursor: pointer;
      min-width: 180px;
    }
    .model-selector select:focus { outline: none; border-color: var(--accent); }
    .api-key-display {
      background: var(--bg-card);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 13px;
      color: var(--text-muted);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .api-key-display span { color: var(--text-main); font-family: monospace; }
    .chat-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .message {
      max-width: 80%;
      padding: 12px 16px;
      border-radius: 12px;
      word-wrap: break-word;
      line-height: 1.6;
      font-size: 15px;
    }
    .message.user {
      align-self: flex-end;
      background: var(--accent);
      color: #0D1117;
      border-bottom-left-radius: 4px;
    }
    .message.assistant {
      align-self: flex-start;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-bottom-right-radius: 4px;
    }
    .message .role-badge { font-size: 11px; opacity: 0.7; display: block; margin-bottom: 4px; }
    .input-area {
      display: flex;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
      align-items: flex-end;
    }
    .input-area textarea {
      flex: 1;
      background: var(--input-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-main);
      padding: 12px;
      font-family: 'Tajawal';
      font-size: 15px;
      resize: vertical;
      min-height: 50px;
      max-height: 150px;
    }
    .input-area textarea:focus { outline: none; border-color: var(--accent); }
    .input-area button {
      background: var(--accent);
      color: #0D1117;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Tajawal';
      transition: 0.2s;
      height: 50px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .input-area button:hover { background: var(--accent-hover); }
    .input-area button:disabled { opacity: 0.5; cursor: not-allowed; }
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(4px);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    .modal-overlay.active { display: flex; }
    .modal-box {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .modal-box textarea {
      background: var(--input-bg);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 12px;
      border-radius: 6px;
      font-family: 'Tajawal';
      min-height: 100px;
      width: 100%;
    }
    .modal-box .btn-row { display: flex; gap: 12px; justify-content: flex-end; }
    .status-msg { font-size: 13px; color: var(--text-muted); padding: 4px 0; }
    .status-msg.error { color: #F85149; }
    .status-msg.success { color: #3FB950; }
  </style>
</head>
<body>
<!-- Sidebar -->
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
<!-- Main -->
<main class="main">
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
  <div class="chat-container" id="chatContainer">
    <div style="color: var(--text-muted); text-align: center; padding: 40px; align-self: center;">
      <i class="fas fa-comment-dots" style="font-size: 32px; display: block; margin-bottom: 12px;"></i>
      أهلاً بك! سجل الدخول أو سجل جديد وابدأ المحادثة.
    </div>
  </div>
  <div class="input-area">
    <textarea id="messageInput" rows="1" placeholder="اكتب رسالتك هنا..." dir="auto"></textarea>
    <button id="sendBtn"><i class="fas fa-paper-plane"></i> إرسال</button>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px;">
    <span class="status-msg" id="statusMsg"></span>
    <button id="openPromptModalBtn" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 13px;">
      <i class="fas fa-edit"></i> تعديل التعليمات (System Prompt)
    </button>
  </div>
</main>
<!-- Modal -->
<div class="modal-overlay" id="promptModal">
  <div class="modal-box">
    <h3 style="color: var(--accent);"><i class="fas fa-robot"></i> تعليمات النظام (System Prompt)</h3>
    <textarea id="promptTextarea" placeholder="مثال: أنت مساعد ذكي متخصص في البرمجة..."></textarea>
    <div class="btn-row">
      <button onclick="closePromptModal()" style="background: var(--border-color); border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; color: var(--text-main);">إلغاء</button>
      <button id="savePromptBtn" class="btn-primary" style="background: var(--accent); border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 700;">حفظ</button>
    </div>
  </div>
</div>
<script>
// ===== الحالة العامة =====
var state = {
  username: null,
  apikey: null,
  currentConversationId: null,
  messages: [],
  model: null,
  isLoading: false
};

// ===== العناصر =====
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

// ===== دوال مساعدة =====
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
    chatContainer.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 40px; align-self: center;"><i class="fas fa-comment-dots" style="font-size: 32px; display: block; margin-bottom: 12px;"></i>لا توجد رسائل. ابدأ المحادثة!</div>';
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

// ===== جلب النماذج =====
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

// ===== جلب المحادثات =====
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

      // إضافة مستمعات النقر
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

// ===== تحميل محادثة محددة =====
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

// ===== إرسال رسالة =====
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

// ===== المصادقة =====
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
    chatContainer.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 40px; align-self: center;"><i class="fas fa-comment-dots" style="font-size: 32px; display: block; margin-bottom: 12px;"></i>تم تسجيل الخروج.</div>';
    conversationList.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 20px; font-size: 14px;">سجل الدخول لعرض المحادثات</div>';
    setStatus('تم تسجيل الخروج', '');
  };
}

// ===== الـ System Prompt =====
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

// ===== مستمعات الأحداث =====
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

// تحميل النماذج عند بدء التشغيل
loadModels();

console.log('AI Proxy ready!');
</script>
</body>
</html>`;
