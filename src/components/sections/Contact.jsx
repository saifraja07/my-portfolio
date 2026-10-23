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

const fieldControl = [
  'block w-full min-w-0 rounded-[.55rem] border border-line bg-[color:color-mix(in_srgb,var(--bg)_92%,var(--fg))]',
  'px-[.9rem] py-[.8rem] text-[.83rem] leading-[1.6] text-fg outline-none',
  '[transition:border-color_160ms_ease,box-shadow_160ms_ease,background-color_160ms_ease]',
  'placeholder:text-muted placeholder:opacity-65',
  'focus:border-accent focus:[box-shadow:0_0_0_3px_color-mix(in_srgb,var(--accent)_12%,transparent)]',
  'aria-invalid:border-accent',
].join(' ')

const socialLinkBase = 'grid size-[2.45rem] place-items-center rounded-full border border-line text-muted [transition:color_160ms_ease,border-color_160ms_ease,transform_160ms_ease] hover:border-accent hover:text-accent hover:[transform:translateY(-2px)]'

const statusBase = 'rounded-[.55rem] border px-[.9rem] py-[.8rem] text-[.78rem] leading-[1.6]'
const statusStyles = {
  success: 'border-[color:color-mix(in_srgb,#22c55e_55%,var(--border))] bg-[color:color-mix(in_srgb,#22c55e_8%,var(--bg))]',
  error: 'border-accent bg-[color:color-mix(in_srgb,var(--accent)_7%,var(--bg))]',
}

const emailLinkClass = 'inline-flex max-w-full items-center gap-1 text-[.78rem] [overflow-wrap:anywhere] text-fg transition-colors duration-160 ease-[ease] hover:text-accent'
const fieldClass = 'flex flex-col gap-[.45rem]'
const labelClass = 'inline-flex items-center gap-[.45rem] text-[.72rem] text-muted [&_svg]:text-accent'
const errorClass = 'mt-[.1rem] text-[.72rem] leading-normal text-accent'

function ContactIllustration() {
  return (
    <svg
      viewBox="0 0 520 360"
      role="img"
      aria-label="Illustration of messages and a phone"
      className="mx-auto block max-h-84 w-[min(100%,29rem)] overflow-visible max-[700px]:max-h-68"
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
        message: "Message submitted successfully, I'll try my best to respond as soon as possible.",
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
    <section id="contact" aria-labelledby="contact-title" className="shell pt-[clamp(2.5rem,5vw,7.5rem)] pb-[clamp(4.5rem,9vw,7rem)] max-[700px]:pt-16 max-[700px]:pb-16">
      <div className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] max-w-176 text-center max-[700px]:mb-8">
        <p className="mb-[.8rem] inline-flex items-center gap-[.55rem] text-[.68rem] tracking-[.16em] text-muted"><span className="size-[.42rem] rounded-full bg-accent [box-shadow:0_0_0_4px_color-mix(in_srgb,var(--accent)_13%,transparent)]" /> CONTACT</p>
        <h2 id="contact-title" className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] font-medium tracking-[-.065em] text-fg">Let&apos;s <span className="text-accent">connect.</span></h2>
        <p className="mx-auto mt-4 text-[clamp(.84rem,1.5vw,.98rem)] leading-[1.8] text-muted">Have a project in mind, a question, or just want to say hello?</p>
      </div>

      <div className="mx-auto grid max-w-250 grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-center gap-[clamp(2rem,7vw,6rem)] max-[700px]:grid-cols-[minmax(0,1fr)] max-[700px]:gap-10">
        <div className="min-w-0 max-[700px]:mx-auto max-[700px]:w-full max-[700px]:max-w-108">
          <ContactIllustration />
          <div className="mx-auto mt-[.7rem] flex w-fit max-w-full items-center gap-[.85rem] rounded-[.7rem] border border-line bg-[color-mix(in_srgb,var(--bg)_90%,var(--fg))] px-4 py-3">
            <span className="grid size-[2.4rem] flex-none place-items-center rounded-[.55rem] bg-[color-mix(in_srgb,var(--accent)_13%,transparent)] text-accent"><Mail size={17} /></span>
            <div>
              <p className="mb-[.12rem] text-[.67rem] text-muted">Prefer email?</p>
              {recipient ? (
                <a href={`mailto:${recipient}`} className={emailLinkClass}>{recipient} <ArrowUpRight size={14} /></a>
              ) : (
                <span className={emailLinkClass}>Add your email in siteConfig.js</span>
              )}
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-[.65rem]" aria-label="Social links">
            {socialLinks.filter((link) => link.id !== 'email').map((link) => (
              <a
                key={link.id}
                href={link.href || undefined}
                {...(link.external && link.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={link.label}
                title={link.label}
                className={`${socialLinkBase}${link.href ? '' : ' cursor-default opacity-40'}`}
                aria-disabled={!link.href || undefined}
                onClick={!link.href ? (event) => event.preventDefault() : undefined}
              >
                <link.Icon size={link.id === 'instagram' ? 19 : 17} className={link.id === 'instagram' ? 'stroke-[2.2] flex-none filter-[drop-shadow(0_0_.15px_currentColor)]' : undefined} />
              </a>
            ))}
          </div>
        </div>

        <form className="flex min-w-0 flex-col gap-[1.15rem] max-[700px]:w-full" onSubmit={handleSubmit} noValidate>
          <div className={fieldClass}>
            <label htmlFor="contact-name" className={labelClass}><UserRound size={13} /> Name</label>
            <input
              id="contact-name" name="name" autoComplete="name" value={form.name}
              onChange={updateField} placeholder="Your name" required maxLength={MAX_NAME}
              aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={`${fieldControl} min-h-12`}
            />
            {errors.name ? <p id="contact-name-error" className={errorClass}>{errors.name}</p> : null}
          </div>
          <div className={fieldClass}>
            <label htmlFor="contact-email" className={labelClass}><Mail size={13} /> Email</label>
            <input
              id="contact-email" name="email" type="email" autoComplete="email" value={form.email}
              onChange={updateField} placeholder="you@example.com" required maxLength={MAX_EMAIL}
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={`${fieldControl} min-h-12`}
            />
            {errors.email ? <p id="contact-email-error" className={errorClass}>{errors.email}</p> : null}
          </div>
          <div className={fieldClass}>
            <label htmlFor="contact-message" className={labelClass}><MessageSquare size={13} /> Message</label>
            <textarea
              id="contact-message" name="message" value={form.message} onChange={updateField}
              placeholder="Tell me a little about what you have in mind..." rows={5} required maxLength={MAX_MESSAGE}
              aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className={`${fieldControl} min-h-36 resize-y`}
            />
            <div className="flex items-start justify-between gap-4 text-[.65rem] text-muted">
              {errors.message ? <p id="contact-message-error" className={errorClass}>{errors.message}</p> : <span />}
              <span>{form.message.length}/{MAX_MESSAGE}</span>
            </div>
          </div>
          <div className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input id="contact-website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {status.message ? (
            <p className={`${statusBase} ${statusStyles[status.type]}`} role={status.type === 'error' ? 'alert' : 'status'}>
              {status.message}
            </p>
          ) : null}
          <button className="mt-[.15rem] inline-flex min-h-[3.1rem] items-center justify-center gap-[.65rem] rounded-[.55rem] border border-accent bg-accent px-4 py-3 text-[.82rem] font-semibold text-bg [transition:transform_160ms_ease,opacity_160ms_ease,box-shadow_160ms_ease] enabled:hover:transform-[translateY(-1px)] enabled:hover:[box-shadow:0_8px_24px_color-mix(in_srgb,var(--accent)_17%,transparent)] disabled:cursor-not-allowed disabled:opacity-45" type="submit" disabled={isSending}>
            <Send size={15} /> {isSending ? 'Sending…' : 'Send message'} <ArrowUpRight size={15} className="ml-auto" />
          </button>
          <p className="mt-[-0.45rem] text-center text-[.66rem] text-muted">Your details are used only to reply to your message.</p>
        </form>
      </div>
    </section>
  )
}
