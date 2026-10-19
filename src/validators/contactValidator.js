import { LIMITS, ALLOWED_QUERY_TYPES, MESSAGES } from "../config/formConfig";

// Türkçe dahil tüm harfler, boşluk, tire ve kesme işareti
const NAME_REGEX = /^[\p{L}\p{M}]+(?:[ '’-][\p{L}\p{M}]+)*$/u;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Temizlenmiş (sanitize edilmiş) veriyi alır, hata nesnesi döndürür
export function validateContactForm(data) {
  const errors = {};

  // Ad ve soyad
  for (const field of ["firstName", "lastName"]) {
    const v = data[field];
    if (!v) {
      errors[field] = MESSAGES.required;
    } else if (v.length < LIMITS.name.min || v.length > LIMITS.name.max) {
      errors[field] = MESSAGES.nameLength;
    } else if (!NAME_REGEX.test(v)) {
      errors[field] = MESSAGES.invalidName;
    }
  }

  // E-posta (uzunluk regex'ten ÖNCE kontrol edilir)
  if (!data.email) {
    errors.email = MESSAGES.required;
  } else if (data.email.length > LIMITS.email.max || !EMAIL_REGEX.test(data.email)) {
    errors.email = MESSAGES.invalidEmail;
  }

  // Sorgu türü: sadece whitelist'tekiler
  if (!ALLOWED_QUERY_TYPES.includes(data.query)) {
    errors.query = MESSAGES.required;
  }

  // Mesaj
  if (!data.message) {
    errors.message = MESSAGES.required;
  } else if (data.message.length < LIMITS.message.min) {
    errors.message = MESSAGES.messageMin;
  } else if (data.message.length > LIMITS.message.max) {
    errors.message = MESSAGES.messageMax;
  }

  // Onay kutusu kesin olarak true olmalı
  if (data.consent !== true) {
    errors.consent = MESSAGES.required;
  }

  return errors;
}