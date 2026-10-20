import { useEffect, useState } from "react";
import { INITIAL_FORM, ALLOWED_QUERY_TYPES, SUCCESS_MESSAGE_MS, MESSAGES, } from "../config/formConfig";
import { sanitizeFormData } from "../utils/sanitize";
import { validateContactForm } from "../validators/contactValidator";
import { sendContactForm } from "../services/contactServices";

export default function useContactForm() {
  const [submit, setSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Başarı mesajını belirli süre sonra gizle
  useEffect(() => {
    if (!submit) return;
    const timer = setTimeout(() => setSubmit(false), SUCCESS_MESSAGE_MS);
    return () => clearTimeout(timer);
  }, [submit]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // DOM üzerinden oynanmış (tampered) alan adlarını yok say
    if (!Object.hasOwn(INITIAL_FORM, name)) return;

    // Radio için değer whitelist dışındaysa yok say
    if (name === "query" && !ALLOWED_QUERY_TYPES.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Kullanıcı yazmaya başlayınca o alanın hatasını temizle
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Çift gönderim koruması
    if (isSubmitting) return;

    // Honeypot dolu ise bot kabul et: sessizce başarılıymış gibi davran
    if (formData.website) {
      setFormData(INITIAL_FORM);
      setSubmit(true);
      return;
    }

    // 1) Temizle  2) Doğrula
    const cleaned = sanitizeFormData(formData);
    const validationErrors = validateContactForm(cleaned);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // 3) Gönder
      await sendContactForm(cleaned);
      setSubmit(true);
      setFormData(INITIAL_FORM);       // yalnızca başarılı gönderimde sıfırla
    } catch {
      // Sunucu hata detayını gösterme, genel mesaj ver
      setErrors({ form: MESSAGES.sendFailed });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { formData, errors, submit, isSubmitting, handleChange, handleSubmit };
}