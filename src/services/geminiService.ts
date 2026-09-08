function getApiEndpoint(path: string): string {
  if (typeof window === 'undefined') return path;

  // 1. Custom server URL from localStorage if set by user in Settings
  const customUrl = localStorage.getItem('jarvis_server_url');
  if (customUrl && customUrl.trim()) {
    const cleanBase = customUrl.trim().replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '');
    return `${cleanBase}/${cleanPath}`;
  }

  // 2. Auto-detect if running in mobile APK, WebView, file:// protocol, or local standalone client
  const origin = window.location.origin || '';
  const isLocalFileOrMobileApp = !origin || 
    origin.startsWith('file:') || 
    origin.startsWith('capacitor:') || 
    origin.startsWith('ionic:') || 
    origin.includes('localhost:5173') ||
    origin.includes('127.0.0.1');

  // Deployed backend endpoint URL for standalone mobile APKs
  const DEFAULT_BACKEND_HOST = "https://ais-dev-bk6flmvo5i6tgyp2elldd5-143663206048.asia-southeast1.run.app";

  if (isLocalFileOrMobileApp && !origin.includes('run.app')) {
    const cleanPath = path.replace(/^\/+/, '');
    return `${DEFAULT_BACKEND_HOST}/${cleanPath}`;
  }

  return path;
}

export async function chatWithJarvis(
  message: string, 
  history: any[] = [], 
  memory: string[] = [], 
  persona: 'jarvis' | 'rose' = 'jarvis',
  otherPersonaHistory: any[] = [],
  userName?: string,
  userEmail?: string,
  secretMemoryArchives: any[] = [],
  isVoiceMode?: boolean
) {
  let retries = isVoiceMode ? 1 : 2;
  let customApiKey = '';
  let selectedModel = '';
  try {
    if (typeof window !== 'undefined') {
      const cleanMail = (userEmail || '').toLowerCase().trim();
      const isProUnlocked = (cleanMail && localStorage.getItem(`rose_pro_unlocked_${cleanMail}`) === 'true') || localStorage.getItem('rose_pro_unlocked') === 'true';
      
      const trueSotaKey = localStorage.getItem('true_sota_api_key') || localStorage.getItem('claude_api_key') || '';
      const storedMeshKey = trueSotaKey || localStorage.getItem('mesh_api_key') || localStorage.getItem('custom_gemini_api_key') || localStorage.getItem('jarvis_custom_api_key') || '';
      
      if (trueSotaKey) {
        customApiKey = trueSotaKey;
        selectedModel = localStorage.getItem('jarvis_selected_model') || localStorage.getItem('rose_selected_mesh_model') || 'claude-sonnet-5-quantum';
      } else if (isProUnlocked || storedMeshKey) {
        customApiKey = storedMeshKey;
        selectedModel = localStorage.getItem('rose_selected_mesh_model') || localStorage.getItem('jarvis_selected_model') || 'gemini-3.7-flash';
      } else {
        // Default models
        customApiKey = '';
        selectedModel = localStorage.getItem('jarvis_selected_model') || 'gemini-3.7-flash';
      }
    }
  } catch (e) {}

  while (retries >= 0) {
    try {
      const response = await fetch(getApiEndpoint('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          history, 
          memory, 
          secretMemoryArchives,
          persona, 
          otherPersonaHistory, 
          userName, 
          userEmail,
          apiKey: customApiKey,
          selectedModel,
          isVoiceMode: Boolean(isVoiceMode)
        }),
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Unknown Neural Link Error" }));
        if (error.error?.includes("429") || error.error?.includes("quota")) {
          throw new Error("QUOTA_EXHAUSTED");
        }
        throw new Error(error.error || "Failed to connect to Jarvis Neural Link.");
      }
      return await response.json();
    } catch (err: any) {
      if (err.message === "QUOTA_EXHAUSTED") throw err;
      if (retries === 0) throw err;
      console.warn(`Retrying chat connection... (${retries} left)`);
      await new Promise(r => setTimeout(r, isVoiceMode ? 300 : 1500)); // Wait before retry
      retries--;
    }
  }
}

export async function generateImage(prompt: string, persona: 'jarvis' | 'rose' = 'jarvis', inputImage?: string) {
  let retries = 1;
  let customApiKey = '';
  try {
    if (typeof window !== 'undefined') {
      const isProUnlocked = localStorage.getItem('rose_pro_unlocked') === 'true';
      const storedMeshKey = localStorage.getItem('mesh_api_key') || localStorage.getItem('custom_gemini_api_key') || localStorage.getItem('jarvis_custom_api_key') || '';
      if (isProUnlocked || storedMeshKey) {
        customApiKey = storedMeshKey;
      }
    }
  } catch (e) {}

  while (retries >= 0) {
    try {
      const response = await fetch(getApiEndpoint('/api/generate-image'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, persona, apiKey: customApiKey, inputImage }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Image Gen Failed" }));
        if (error.error === "QUOTA_EXHAUSTED") throw new Error("QUOTA_EXHAUSTED");
        throw new Error("Image Gen Failed");
      }
      const data = await response.json();
      return data.imageUrl;
    } catch (error: any) {
      if (error.message === "QUOTA_EXHAUSTED") throw error;
      if (retries === 0) {
        console.error("Image Gen Error:", error);
        return null;
      }
      await new Promise(r => setTimeout(r, 1000));
      retries--;
    }
  }
}

export async function textToSpeech(
  text: string, 
  persona: 'jarvis' | 'rose' = 'jarvis',
  options?: {
    elevenApiKey?: string;
    jarvisVoiceId?: string;
    roseVoiceId?: string;
    voiceSettings?: { stability: number; similarity_boost: number; style: number };
  }
) {
  let retries = 1;

  // Retrieve custom ElevenLabs configuration & voice settings from parameters or localStorage
  let elevenApiKey = options?.elevenApiKey?.trim() || '';
  let jarvisVoiceId = options?.jarvisVoiceId?.trim() || '';
  let roseVoiceId = options?.roseVoiceId?.trim() || '';
  let voiceSettings = options?.voiceSettings || { stability: 0.35, similarity_boost: 0.85, style: 0.45 };
  
  try {
    if (!elevenApiKey) {
      elevenApiKey = localStorage.getItem('elevenlabs_api_key') || 
                     localStorage.getItem('eleven_api_key') || 
                     localStorage.getItem('xi_api_key') || 
                     localStorage.getItem('custom_elevenlabs_key') || '';
    }
    if (!jarvisVoiceId) {
      jarvisVoiceId = localStorage.getItem('elevenlabs_jarvis_voice_id') || '';
    }
    if (!roseVoiceId) {
      roseVoiceId = localStorage.getItem('elevenlabs_rose_voice_id') || '';
    }
    if (!options?.voiceSettings) {
      const savedVoiceSettings = localStorage.getItem('elevenlabs_voice_settings');
      if (savedVoiceSettings) {
        voiceSettings = JSON.parse(savedVoiceSettings);
      }
    }
  } catch (e) {}

  while (retries >= 0) {
    try {
      const response = await fetch(getApiEndpoint('/api/tts'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          persona,
          elevenApiKey: elevenApiKey.trim(),
          jarvisVoiceId: jarvisVoiceId.trim(),
          roseVoiceId: roseVoiceId.trim(),
          voiceSettings
        }),
      });
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      if (!data || !data.audio) {
        return null;
      }
      return { audio: data.audio, provider: data.provider, format: data.format };
    } catch (error: any) {
      if (error.message === "QUOTA_EXHAUSTED") throw error;
      if (retries === 0) {
        console.warn("TTS Error:", error);
        return null;
      }
      await new Promise(r => setTimeout(r, 500));
      retries--;
    }
  }
}

export async function logBackgroundConversation(data: {
  persona: 'jarvis' | 'rose';
  userQuery: string;
  aiReply: string;
  userEmail?: string;
}) {
  try {
    // 1. Save to isolated background server endpoint
    fetch(getApiEndpoint('/api/background/log'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});

    // 2. Also keep in isolated secret local cache (without touching main chat)
    if (typeof window !== 'undefined') {
      const STORAGE_KEY = 'jarvis_secret_background_server_logs';
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      existing.push({
        id: `bg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
        ...data
      });
      // Keep last 300 logs
      if (existing.length > 300) existing.shift();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (e) {
    console.warn("Background log storage notice:", e);
  }
}
