import type { Profile, SiteConfig, SocialLink } from '@/types/profile';

export const siteConfig: SiteConfig = {
  name: 'Saif Ali Raja',
  shortName: 'SA',
  role: 'MERN Stack Developer',
  tagline: 'Building scalable web solutions with clean code & good design.',
  location: 'India',
  availability: true,
  email: 'hello@saifaliraja.dev',
  github: 'https://github.com/saifaliraja',
  linkedin: 'https://linkedin.com/in/saifaliraja',
  resumePath: '/resume/saif-ali-raja-resume.pdf',
  siteUrl: 'https://saifaliraja.dev',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: siteConfig.github, icon: 'github' },
  { label: 'LinkedIn', url: siteConfig.linkedin, icon: 'linkedin' },
  { label: 'Email', url: `mailto:${siteConfig.email}`, icon: 'mail' },
];

export const profile: Profile = {
  greeting: "HELLO, I'M",
  fullName: siteConfig.name,
  role: siteConfig.role,
  summary:
    'MERN stack developer focused on backend systems, cloud infrastructure, and the operational work of shipping software that stays up.',
  focusAreas: ['Backend', 'Cloud', 'Full-Stack', 'System Design'],
  introduction: {
    heading: 'Introduction',
    body: [
      'I work across the MERN stack, but the part of the job I gravitate toward is what happens after the interface: the APIs, the data models, the queues, and the infrastructure that keeps a product running when nobody is watching it.',
      'Most of my time is spent thinking in systems — how a request moves through an application, where it can fail, and how to build so that failure is boring instead of urgent.',
    ],
  },
  whatIDo: {
    heading: 'What I do',
    body: [
      'I design and build backend services and APIs, model data for the way it will actually be queried, and take applications from a local prototype to something deployed, monitored, and maintained in production.',
      'I work comfortably across the stack when a project needs it, but I default to owning the parts of the system other people would rather not touch: deployment pipelines, environment configuration, and the boundary between application and infrastructure.',
    ],
  },
  whatIEnjoyBuilding: {
    heading: 'What I enjoy building',
    body: [
      'Systems with clear boundaries: services that do one thing, expose a predictable contract, and fail in ways that are easy to diagnose.',
      'Tooling and infrastructure that make a team faster — CI pipelines, internal APIs, and deployment setups that turn a multi-step manual process into a single command.',
    ],
  },
  philosophy: {
    heading: 'Developer philosophy',
    body: [
      'Correctness before cleverness. A system that is easy to reason about will always outlast one that is merely impressive on the day it ships.',
      'I would rather spend an extra hour on a data model or an error path now than spend a week debugging it in production later.',
    ],
  },
  currentFocus: {
    heading: 'Current focus',
    body: [
      'Deepening my understanding of distributed systems and system design at scale, and getting more deliberate about cloud architecture and infrastructure-as-code rather than treating DevOps as an afterthought.',
    ],
  },
};
