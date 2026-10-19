// Güvenlik ve form ile ilgili tüm sabitler tek merkezde tutulur

export const LIMITS = {
  name: { min: 2, max: 50 },
  email: { max: 254 },            // RFC 5321 üst sınırı
  message: { min: 10, max: 2000 },
};

// Sadece izin verilen sorgu türleri (whitelist)
export const ALLOWED_QUERY_TYPES = ["genel", "destek"];

export const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  query: "",
  message: "",
  consent: false,
  website: "",                    // honeypot alanı (bot tuzağı)
};

export const API_ENDPOINT = "/api/contact";   // Sadece HTTPS, secret/anahtar ASLA yazılmaz
export const REQUEST_TIMEOUT_MS = 10000;
export const SUCCESS_MESSAGE_MS = 5000;

export const MESSAGES = {
  required: "Bu Alan Boş Bırakılamaz",
  invalidEmail: "Geçerli Bir E-Mail Adresi Giriniz",
  invalidName: "Yalnızca harf, boşluk, tire ve kesme işareti kullanılabilir",
  nameLength: `${LIMITS.name.min}-${LIMITS.name.max} karakter arasında olmalıdır`,
  messageMin: `Mesaj en az ${LIMITS.message.min} karakter olmalıdır`,
  messageMax: `Mesaj en fazla ${LIMITS.message.max} karakter olabilir`,
  sendFailed: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
};