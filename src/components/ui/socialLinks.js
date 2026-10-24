import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons'
import { siteConfig } from '../../data/siteConfig'

const { github, linkedin, instagram, email } = siteConfig.social

// Shared by Contact and Footer. Empty URLs are displayed as inactive placeholders.
export const socialLinks = [
  { id: 'github', label: 'GitHub', Icon: GithubIcon, href: github, external: true },
  { id: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon, href: linkedin, external: true },
  { id: 'instagram', label: 'Instagram', Icon: InstagramIcon, href: instagram, external: true },
  { id: 'email', label: 'Email', Icon: Mail, href: email ? `mailto:${email}` : '', external: false },
]
