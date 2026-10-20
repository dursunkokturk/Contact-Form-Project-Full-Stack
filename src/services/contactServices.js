import { API_ENDPOINT, REQUEST_TIMEOUT_MS } from "../config/formConfig";

// Başarısızlıkta Error fırlatır; sunucu hata detayı dışarı sızdırılmaz
export async function sendContactForm(payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "same-origin",
      signal: controller.signal,
    });

    if (!res.ok) throw new Error("request_failed");
  } finally {
    clearTimeout(timeoutId);
  }
}