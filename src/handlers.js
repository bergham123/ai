export async function handleGetModels(request, env) {
  try {
    const modelsFile = await githubGetFile(env, getModelsPath());
    if (!modelsFile.exists) {
      // إنشاء القائمة الافتراضية بالأسماء المخصصة
      const defaultModels = [
        { "name": "wld khadija", "id": "tencent/hy3:free" },
        { "name": "hamada", "id": "nvidia/nemotron-3-ultra-550b-a55b:free" },
        { "name": "obama", "id": "poolside/laguna-m.1:free" },
        { "name": "ayoube", "id": "nvidia/nemotron-3-super-120b-a12b:free" },
        { "name": "cohere", "id": "cohere/north-mini-code:free" },
        { "name": "nemotron", "id": "nvidia/nemotron-3-nano-30b-a3b:free" },
        { "name": "laguna", "id": "poolside/laguna-xs-2.1:free" },
        { "name": "nvidia", "id": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free" },
        { "name": "chatgpt-oss", "id": "openai/gpt-oss-20b:free" },
        { "name": "waldkhadija-v-1", "id": "nvidia/nemotron-nano-9b-v2:free" },
        { "name": "google-gemma", "id": "google/gemma-4-31b-it:free" }
      ];
      await githubPutFile(env, getModelsPath(), JSON.stringify(defaultModels, null, 2), null, "Init models");
      return jsonResponse({ ok: true, models: defaultModels });
    }
    
    let models;
    try {
      models = JSON.parse(modelsFile.content);
    } catch (e) {
      models = [];
    }

    // التوافق مع الصيغة القديمة (مصفوفة نصوص) وتحويلها إلى الصيغة الجديدة
    if (Array.isArray(models) && models.length > 0) {
      if (typeof models[0] === 'string') {
        models = models.map(id => ({ name: id, id }));
      }
    } else {
      // إذا كانت فارغة أو غير صالحة، استخدم القائمة الافتراضية
      models = [
        { name: "محمد", id: "tencent/hy3:free" },
        { name: "أحمد", id: "nvidia/nemotron-3-ultra-550b-a55b:free" },
        { name: "علي", id: "poolside/laguna-m.1:free" }
      ];
    }

    return jsonResponse({ ok: true, models });
  } catch (err) {
    return jsonResponse({ error: String(err.message || err) }, 500);
  }
}
