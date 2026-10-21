import { useState } from 'react'
import { ArrowUpRight, Mail, MessageSquare, Send, UserRound } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import { socialLinks } from '../ui/socialLinks'

const MAX_NAME = 100
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000

function containsControlCharacters(value) {
  return Array.from(value).some((char) => {
    const code = char.codePointAt(0)
    return code <= 0x1f || (code >= 0x7f && code <= 0x9f)
  })
}

function isValidEmail(value) {
  if (value.length > MAX_EMAIL || /\s/.test(value) || containsControlCharacters(value)) {
    return false
  }
  const parts = value.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (!local || local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false
  const labels = domain.split('.')
  if (labels.length < 2 || labels.some((label) => !label || label.length > 63)) return false
  if (labels.some((label) => !/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label))) return false
  return /^[A-Za-z]{2,63}$/.test(labels.at(-1)) || /^xn--[A-Za-z0-9-]{2,59}$/.test(labels.at(-1))
}

function validateForm(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Please enter at least 2 characters.'
  else if (name.length > MAX_NAME) errors.name = `Keep your name under ${MAX_NAME} characters.`
  else if (containsControlCharacters(name)) errors.name = 'Your name contains invalid characters.'

  if (!email) errors.email = 'Please enter your email address.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'

  if (message.length < 10) errors.message = 'Please write at least 10 characters.'
  else if (message.length > MAX_MESSAGE) errors.message = `Keep your message under ${MAX_MESSAGE} characters.`
  else if (message.replace(/\s/g, '').length < 10) errors.message = 'Your message needs a little more detail.'

  return errors
}

function ContactIllustration() {
  return (
    <svg
      viewBox="0 0 520 360"
      role="img"
      aria-label="Illustration of messages and a phone"
      className="contact-illustration"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="phoneFill" x1="183" y1="92" x2="329" y2="282" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" stopOpacity=".18" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity=".04" />
        </linearGradient>
      </defs>
      <circle cx="258" cy="178" r="116" stroke="var(--border)" strokeDasharray="4 9" strokeWidth="1.5" />
      <circle cx="258" cy="178" r="87" fill="var(--accent)" fillOpacity=".045" />
      <g stroke="var(--muted)" strokeOpacity=".72" strokeWidth="2.4" strokeLinejoin="round">
        <rect x="54" y="83" width="93" height="63" rx="9" />
        <path d="m57 89 43 32 44-32" />
        <rect x="355" y="70" width="105" height="70" rx="10" />
        <path d="m359 77 48 35 49-35" />
        <rect x="365" y="220" width="82" height="56" rx="9" />
        <path d="m369 226 37 27 37-27" />
      </g>
      <g fill="var(--accent)">
        <circle cx="82" cy="226" r="18" fillOpacity=".14" />
        <circle cx="82" cy="226" r="7" />
        <circle cx="429" cy="179" r="13" fillOpacity=".18" />
        <circle cx="429" cy="179" r="5" />
        <circle cx="151" cy="54" r="5" />
        <circle cx="380" cy="302" r="5" />
      </g>
      <g transform="rotate(-11 258 178)">
        <rect x="188" y="75" width="140" height="218" rx="23" fill="var(--fg)" />
        <rect x="197" y="86" width="122" height="195" rx="15" fill="url(#phoneFill)" stroke="var(--border)" strokeWidth="1.5" />
        <rect x="238" y="96" width="40" height="4" rx="2" fill="var(--muted)" fillOpacity=".65" />
        <circle cx="258" cy="176" r="38" fill="var(--accent)" />
        <path d="m251 157 24 17-24 17v-34Z" fill="var(--bg)" />
        <rect x="223" y="232" width="70" height="6" rx="3" fill="var(--muted)" fillOpacity=".4" />
        <rect x="234" y="245" width="48" height="5" rx="2.5" fill="var(--muted)" fillOpacity=".22" />
      </g>
      <path d="M326 158c27-8 42-1 54 16" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 7" />
      <path d="m369 164 13 10-2-16" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [lastSentAt, setLastSentAt] = useState(0)
  const recipient = siteConfig.social.email

  function updateField(event) {
    const { name, value } = event.target
    const limits = { name: MAX_NAME, email: MAX_EMAIL, message: MAX_MESSAGE }
    setForm((current) => ({ ...current, [name]: value.slice(0, limits[name]) }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setStatus({ type: '', message: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSending) return

    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus({ type: 'error', message: 'Please check the highlighted fields and try again.' })
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus()
      return
    }

    if (!recipient || !isValidEmail(recipient)) {
      setStatus({ type: 'error', message: 'Contact email is not configured yet. Please use the email link instead.' })
      return
    }

    if (Date.now() - lastSentAt < 15000) {
      setStatus({ type: 'error', message: 'Please wait a few seconds before sending another message.' })
      return
    }

    // Honeypot field is hidden from people; bots that fill it are silently ignored.
    const honeypot = event.currentTarget.elements.namedItem('_honey')?.value
    if (honeypot) {
      setStatus({ type: 'success', message: 'Thanks! Your message has been submitted.' })
      setForm({ name: '', email: '', message: '' })
      return
    }

    setIsSending(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          _replyto: form.email.trim(),
          message: form.message.trim(),
          _subject: `Portfolio contact from ${form.name.trim()}`,
          _template: 'table',
          _captcha: 'false',
          _honey: '',
        }),
      })

      let result
      try {
        result = await response.json()
      } catch {
        result = null
      }

      if (!response.ok || ![true, 'true'].includes(result?.success)) {
        throw new Error('The email service could not accept your message.')
      }

      setLastSentAt(Date.now())
      setForm({ name: '', email: '', message: '' })
      setErrors({})
      setStatus({
        type: 'success',
        message: 'Message submitted successfully. If this is the first message, check your inbox to activate FormSubmit for this address.',
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'Your message could not be sent. Please try again or email me directly using the link on this page.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="shell contact-section">
      <div className="contact-heading">
        <p className="contact-eyebrow"><span className="contact-status-dot" /> CONTACT</p>
        <h2 id="contact-title">Let&apos;s <span>connect.</span></h2>
        <p>Have a project in mind, a question, or just want to say hello?</p>
      </div>

      <div className="contact-layout">
        <div className="contact-art-column">
          <ContactIllustration />
          <div className="contact-note">
            <span className="contact-note-icon"><Mail size={17} /></span>
            <div>
              <p className="contact-note-title">Prefer email?</p>
              {recipient ? (
                <a href={`mailto:${recipient}`} className="contact-email-link">{recipient} <ArrowUpRight size={14} /></a>
              ) : (
                <span className="contact-email-link">Add your email in siteConfig.js</span>
              )}
            </div>
          </div>
          <div className="contact-socials" aria-label="Social links">
            {socialLinks.filter((link) => link.id !== 'email').map((link) => (
              <a
                key={link.id}
                href={link.href || undefined}
                {...(link.external && link.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={link.label}
                title={link.label}
                className={`contact-social-link${link.href ? '' : ' contact-social-disabled'}`}
                aria-disabled={!link.href || undefined}
                onClick={!link.href ? (event) => event.preventDefault() : undefined}
              >
                <link.Icon size={link.id === 'instagram' ? 19 : 17} className={`social-brand-icon social-brand-icon-${link.id}`} />
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-field">
            <label htmlFor="contact-name"><UserRound size={13} /> Name</label>
            <input
              id="contact-name" name="name" autoComplete="name" value={form.name}
              onChange={updateField} placeholder="Your name" required maxLength={MAX_NAME}
              aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name ? <p id="contact-name-error" className="contact-field-error">{errors.name}</p> : null}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email"><Mail size={13} /> Email</label>
            <input
              id="contact-email" name="email" type="email" autoComplete="email" value={form.email}
              onChange={updateField} placeholder="you@example.com" required maxLength={MAX_EMAIL}
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email ? <p id="contact-email-error" className="contact-field-error">{errors.email}</p> : null}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message"><MessageSquare size={13} /> Message</label>
            <textarea
              id="contact-message" name="message" value={form.message} onChange={updateField}
              placeholder="Tell me a little about what you have in mind..." rows={5} required maxLength={MAX_MESSAGE}
              aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            <div className="contact-field-meta">
              {errors.message ? <p id="contact-message-error" className="contact-field-error">{errors.message}</p> : <span />}
              <span>{form.message.length}/{MAX_MESSAGE}</span>
            </div>
          </div>
          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input id="contact-website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {status.message ? (
            <p className={`contact-form-status contact-form-status-${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
              {status.message}
            </p>
          ) : null}
          <button className="contact-submit" type="submit" disabled={isSending}>
            <Send size={15} /> {isSending ? 'Sending…' : 'Send message'} <ArrowUpRight size={15} className="contact-submit-arrow" />
          </button>
          <p className="contact-form-hint">Your details are used only to reply to your message.</p>
        </form>
      </div>
    </section>
  )
}
