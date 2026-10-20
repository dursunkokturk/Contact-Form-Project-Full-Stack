import useContactForm from '../hooks/useContactForm'
import { LIMITS } from '../config/formConfig'
import '../App.css'

export default function ContactForm() {

  // Kullanicinin Doldurmasi Gereken Alanlarin 
  // Tek Merkez Uzerinden Kontrol Edilebilir Hale Getiriyoruz
  const { formData, errors, submit, isSubmitting, handleChange, handleSubmit } = useContactForm();
}

return (
  <>
    <div className='out-color'>
      <div className="form-wrapper">
        {submit && (
          <div className='success-message'>
            <div className="success-title">
              <span className='success-icon'>✓</span>
              <h1>Mesaj Gönderildi</h1>
              <h4>Formu doldurduğunuz için teşekkür ederiz. Yakında sizinle iletişime geçeceğiz!</h4>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className='in-color'>
            <h1>İletişim Formu</h1>
            <div className="firstname-and-lastname">
              <div className='user-information'>
                <h4>Adınız</h4>
                <input
                  type="text"
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder='Adınızı Giriniz'
                  className={errors.firstName ? "error-input" : ""}
                  maxLength={LIMITS.name.max}
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <div className='user-information'>
                <h4>Soyadınız</h4>
                <input
                  type="text"
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Soyadınızı Giriniz'
                  className={errors.lastName ? "error-input" : ""}
                  maxLength={LIMITS.name.max}
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>
            </div>
            <div className='user-information'>
              <h4>E-Mail Adresiniz</h4>
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='E-Mail Adresiniz Giriniz'
                className={errors.email ? "error-input" : ""}
                maxLength={LIMITS.email.max}
                autoComplete="email"
                spellCheck={false}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className='query-type'>
              <h4>Sorgu Türü</h4>
              <div className={`query-options ${errors.query ? "error-radio" : ""}`}>
                <label className='query-types'>
                  <input
                    type="radio"
                    name='query'
                    value="genel"
                    checked={formData.query === "genel"}
                    onChange={handleChange}
                  />
                  Genel Sorular
                </label>
                <label className='query-types'>
                  <input
                    type="radio"
                    name='query'
                    value="destek"
                    checked={formData.query === "destek"}
                    onChange={handleChange}
                  />
                  Destek Talebi
                </label>
              </div>
              {errors.query && <span className="error">{errors.query}</span>}
            </div>
            <div className='message'>
              <h4>Mesaj</h4>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "error-input" : ""}
                rows={10}
                maxLength={LIMITS.message.max}
                aria-invalid={!!errors.message}
              ></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <label className='check'>
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <h4>Ekip tarafından benimle iletişime geçilmesini kabul ediyorum *</h4>
              {errors.consent && <span className="error">{errors.consent}</span>}
            </label>
            {/* Honeypot: Gerçek kullanıcı görmez, botlar doldurur */}
            <div className="hp-field" aria-hidden="true">
              <label>
                Bu alanı boş bırakın
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Gönderiliyor..." : "Gönder"}
            </button>
            {errors.form && <span className="error" role="alert">{errors.form}</span>}
          </div>
        </form>
      </div>
    </div>
  </>
)