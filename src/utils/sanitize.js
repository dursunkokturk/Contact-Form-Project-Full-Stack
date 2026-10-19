// Kontrol karakterleri + yön değiştirme (bidi) karakterleri
// (\n, \r, \t korunur; mesaj alanında satır sonu gerekli)
const CONTROL_CHARS =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g;

export function sanitize(value, { multiline = false } = {}) {
  let v = String(value ?? "").normalize("NFC").replace(CONTROL_CHARS, "");
  if (!multiline) v = v.replace(/\s+/g, " ");   // çoklu boşlukları teke indir
  return v.trim();
}

// Formdaki ham veriyi, sunucuya gönderilecek temiz veriye çevirir
export function sanitizeFormData(formData) {
  return {
    firstName: sanitize(formData.firstName),
    lastName: sanitize(formData.lastName),
    email: sanitize(formData.email).toLowerCase(),
    query: formData.query,
    message: sanitize(formData.message, { multiline: true }),
    consent: formData.consent === true,
  };
}