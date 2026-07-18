// src/docs.js
export const DOCS_PAGE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>توثيق API – AI Proxy</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/dracula.min.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg-body: #0D1117;
      --bg-card: #161B22;
      --bg-code: #1C2333;
      --border-color: #30363D;
      --text-primary: #E6EDF3;
      --text-secondary: #8B949E;
      --accent: #58A6FF;
      --accent-hover: #79C0FF;
      --radius: 12px;
      --shadow: 0 8px 32px rgba(0,0,0,0.6);
    }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: var(--bg-body);
      color: var(--text-primary);
      padding: 30px 20px;
      line-height: 1.7;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: var(--bg-card);
      border-radius: var(--radius);
      padding: 40px 35px;
      box-shadow: var(--shadow);
      border: 1px solid var(--border-color);
    }
    h1, h2, h3 {
      font-weight: 600;
      margin-top: 1.5em;
      margin-bottom: 0.6em;
    }
    h1 { font-size: 2.2rem; margin-top: 0; border-bottom: 2px solid var(--accent); padding-bottom: 12px; }
    h1 i { color: var(--accent); margin-left: 12px; }
    h2 { font-size: 1.6rem; border-right: 4px solid var(--accent); padding-right: 14px; }
    h3 { font-size: 1.2rem; color: var(--text-secondary); }
    p { color: var(--text-secondary); margin-bottom: 1em; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }

    .badge {
      display: inline-block;
      background: var(--accent);
      color: #0D1117;
      font-weight: 600;
      padding: 2px 12px;
      border-radius: 30px;
      font-size: 0.75rem;
      margin-right: 8px;
    }
    .badge-method {
      background: #2D3748;
      color: var(--text-primary);
      padding: 2px 10px;
      border-radius: 30px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-left: 10px;
    }
    .endpoint {
      background: var(--bg-code);
      padding: 10px 16px;
      border-radius: 8px;
      border-left: 4px solid var(--accent);
      font-family: 'Consolas', monospace;
      font-size: 0.95rem;
      margin: 12px 0 20px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .code-block {
      position: relative;
      background: var(--bg-code);
      border-radius: var(--radius);
      margin: 16px 0 24px;
      border: 1px solid var(--border-color);
      overflow: hidden;
    }
    .code-block pre {
      padding: 20px 24px;
      margin: 0;
      overflow-x: auto;
      font-size: 0.9rem;
      line-height: 1.6;
      background: transparent;
    }
    .code-block code {
      font-family: 'Fira Code', 'Consolas', monospace;
    }
    .copy-btn {
      position: absolute;
      top: 10px;
      left: 12px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      padding: 4px 12px;
      border-radius: 30px;
      font-size: 0.7rem;
      cursor: pointer;
      transition: 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: inherit;
    }
    .copy-btn:hover {
      background: var(--accent);
      color: #0D1117;
      border-color: var(--accent);
    }
    .copy-btn.copied {
      background: #2EA043;
      color: #fff;
      border-color: #2EA043;
    }

    .table-wrap {
      overflow-x: auto;
      margin: 20px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th, td {
      padding: 12px 16px;
      border: 1px solid var(--border-color);
      text-align: right;
    }
    th {
      background: var(--bg-code);
      color: var(--text-primary);
      font-weight: 600;
    }
    td { color: var(--text-secondary); }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 16px 0;
    }
    .model-card {
      background: var(--bg-code);
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      text-align: center;
      font-weight: 600;
    }

    hr { border: none; border-top: 1px solid var(--border-color); margin: 30px 0; }

    @media (max-width: 768px) {
      .container { padding: 20px; }
      h1 { font-size: 1.6rem; }
      .grid-2 { grid-template-columns: 1fr; }
      .endpoint { flex-direction: column; align-items: flex-start; }
    }

    .hljs { background: transparent; }
  </style>
</head>
<body>

<div class="container">

  <h1><i class="fas fa-brain"></i> توثيق API – AI Proxy</h1>
  <p style="font-size: 1.1rem;">
    نظام وكيل ذكي يوفر وصولاً إلى نماذج متعددة عبر OpenRouter مع إدارة المستخدمين والمفاتيح والمحادثات.
  </p>

  <hr>

  <!-- ====== BASE URL ====== -->
  <h2><i class="fas fa-link"></i> العنوان الأساسي</h2>
  <div class="endpoint">
    <span style="color: var(--accent); font-weight: 600;">BASE URL</span>
    <code style="font-size: 1.1rem;">https://ai.velora.workers.dev</code>
  </div>

  <!-- ====== AUTH ====== -->
  <h2><i class="fas fa-key"></i> المصادقة</h2>
  <p>أرسل مفتاح API في رأس الطلب (Header) بالصيغة التالية:</p>
  <div class="code-block">
    <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
    <pre><code class="language-http">Authorization: Bearer &lt;api_key&gt;</code></pre>
  </div>

  <!-- ====== MODELS (ONLY NAMES) ====== -->
  <h2><i class="fas fa-cubes"></i> النماذج المتاحة</h2>
  <p>يمكنك استخدام أي من الأسماء التالية في حقل <code>model</code> عند إرسال الطلب.</p>
  <div class="grid-2">
    <div class="model-card">wld khadija</div>
    <div class="model-card">hamada</div>
    <div class="model-card">obama</div>
    <div class="model-card">ayoube</div>
    <div class="model-card">cohere</div>
    <div class="model-card">nemotron</div>
    <div class="model-card">laguna</div>
    <div class="model-card">nvidia</div>
    <div class="model-card">chatgpt-oss</div>
    <div class="model-card">waldkhadija-v-1</div>
    <div class="model-card">google-gemma</div>
  </div>

  <!-- ====== ENDPOINTS ====== -->
  <h2><i class="fas fa-code-branch"></i> نقاط النهاية</h2>

  <!-- Chat -->
  <h3><span class="badge-method">POST</span> /api/chat</h3>
  <p>إرسال رسالة إلى النموذج. يمكنك استئناف محادثة بإرسال <code>conversation_id</code>.</p>
  <div class="code-block">
    <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
    <pre><code class="language-json">{
  "model": "wld khadija",
  "messages": [
    { "role": "user", "content": "مرحباً" }
  ],
  "conversation_id": "conv_1784408984012"  // اختياري
}</code></pre>
  </div>

  <!-- Conversations List -->
  <h3><span class="badge-method">GET</span> /api/conversations</h3>
  <p>جلب قائمة جميع المحادثات المحفوظة للمستخدم.</p>

  <!-- Get Conversation -->
  <h3><span class="badge-method">GET</span> /api/conversation/&lt;id&gt;</h3>
  <p>جلب محادثة محددة بكل رسائلها.</p>

  <!-- Delete Conversation -->
  <h3><span class="badge-method">DELETE</span> /api/conversation/&lt;id&gt;</h3>
  <p>حذف محادثة محددة.</p>

  <!-- Prompt -->
  <h3><span class="badge-method">GET</span> /api/user/prompt</h3>
  <p>جلب التعليمات النظامية (System Prompt) الخاصة بك.</p>
  <h3><span class="badge-method">POST</span> /api/user/prompt</h3>
  <div class="code-block">
    <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
    <pre><code class="language-json">{ "system": "أنت خبير في البرمجة..." }</code></pre>
  </div>

  <hr>

  <!-- ====== EXAMPLES ====== -->
  <h2><i class="fas fa-terminal"></i> أمثلة الاستخدام</h2>

  <h3>cURL</h3>
  <div class="code-block">
    <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
    <pre><code class="language-bash">curl -X POST https://ai.velora.workers.dev/api/chat \
  -H "Authorization: Bearer sk-737613b16d14476296ad9d850e00d7d5" \
  -H "Content-Type: application/json" \
  -d '{"model":"wld khadija","messages":[{"role":"user","content":"مرحباً"}]}'</code></pre>
  </div>

  <h3>Python</h3>
  <div class="code-block">
    <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
    <pre><code class="language-python">import requests

url = "https://ai.velora.workers.dev/api/chat"
headers = {
    "Authorization": "Bearer sk-737613b16d14476296ad9d850e00d7d5",
    "Content-Type": "application/json"
}
payload = {
    "model": "wld khadija",
    "messages": [{"role": "user", "content": "مرحباً"}]
}
response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(data["message"]["content"])</code></pre>
  </div>

  <h3>JavaScript (Browser / Node)</h3>
  <div class="code-block">
    <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
    <pre><code class="language-javascript">const url = "https://ai.velora.workers.dev/api/chat";
const apiKey = "sk-737613b16d14476296ad9d850e00d7d5";

fetch(url, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "wld khadija",
    messages: [{ role: "user", content: "مرحباً" }]
  })
})
.then(res => res.json())
.then(data => {
  if (data.ok) console.log(data.message.content);
  else console.error(data.error);
});</code></pre>
  </div>

  <h3>Node.js (axios)</h3>
  <div class="code-block">
    <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
    <pre><code class="language-javascript">const axios = require('axios');

axios.post('https://ai.velora.workers.dev/api/chat', {
  model: "wld khadija",
  messages: [{ role: "user", content: "مرحباً" }]
}, {
  headers: {
    Authorization: 'Bearer sk-737613b16d14476296ad9d850e00d7d5',
    'Content-Type': 'application/json'
  }
})
.then(res => console.log(res.data.message.content))
.catch(err => console.error(err.response?.data));</code></pre>
  </div>

  <hr>

  <!-- ====== LIMITS ====== -->
  <h2><i class="fas fa-gauge-high"></i> حدود الاستخدام</h2>
  <ul style="color: var(--text-secondary); list-style: none; padding-right: 0;">
    <li>🔹 <strong>الحد اليومي للطلبات:</strong> 50 طلب لكل مستخدم (يُعاد عند منتصف الليل UTC).</li>
    <li>🔹 <strong>الحد الأقصى للمحادثات:</strong> 20 محادثة محفوظة لكل مستخدم.</li>
  </ul>

  <!-- ====== ERROR CODES ====== -->
  <h2><i class="fas fa-exclamation-triangle"></i> رموز الأخطاء</h2>
  <div class="table-wrap">
    <table>
      <tr><th>الرمز</th><th>المعنى</th></tr>
      <tr><td>401</td><td>مفتاح API غير صالح أو منتهي.</td></tr>
      <tr><td>400</td><td>طلب غير صحيح (نقص حقول أو JSON غير صحيح).</td></tr>
      <tr><td>404</td><td>المورد غير موجود (مثل محادثة غير موجودة).</td></tr>
      <tr><td>429</td><td>تم تجاوز الحد اليومي للطلبات.</td></tr>
      <tr><td>500</td><td>خطأ داخلي في الخادم – حاول مرة أخرى لاحقاً.</td></tr>
    </table>
  </div>

  <hr>

  <p style="text-align: center; color: var(--text-secondary); margin-top: 20px;">
    <i class="fas fa-heart" style="color: var(--accent);"></i> تمتع بتجربة ذكاء اصطناعي سلسة وآمنة
  </p>

</div>

<!-- ====== SCRIPTS ====== -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  });

  function copyCode(btn) {
    const pre = btn.parentElement.querySelector('pre');
    const code = pre.innerText;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = '<i class="fas fa-copy"></i> نسخ';
        }, 2000);
      }).catch(() => {
        fallbackCopy(code, btn);
      });
    } else {
      fallbackCopy(code, btn);
    }
  }

  function fallbackCopy(text, btn) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<i class="fas fa-copy"></i> نسخ';
      }, 2000);
    } catch (e) {
      alert('تعذر النسخ، يرجى نسخ النص يدوياً.');
    }
    document.body.removeChild(textarea);
  }
</script>
</body>
</html>`;
