import type { ExperienceItem } from '@/types/experience';

export const experience: ExperienceItem[] = [
  {
    id: 'system-design-focus',
    year: '2025 — Present',
    title: 'Deepening system design & cloud architecture',
    description:
      'Shifted focus from shipping individual features to studying how systems scale: load balancing, caching layers, and designing services that degrade gracefully under load.',
    technologies: ['AWS', 'Docker', 'PostgreSQL', 'Redis'],
    achievements: [
      'Rebuilt a personal project\'s backend around a queue-based architecture to decouple slow operations from user-facing requests.',
      'Introduced infrastructure-as-code practices to make environments reproducible instead of hand-configured.',
    ],
  },
  {
    id: 'mern-fulltime',
    year: '2023 — 2025',
    title: 'MERN Stack Development',
    description:
      'Built and maintained full-stack applications end to end — from data modeling and API design through to deployment and monitoring.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'AWS'],
    achievements: [
      'Owned backend architecture for multiple client and personal projects, from schema design to production deployment.',
      'Set up CI/CD pipelines with GitHub Actions to automate testing and deployment for every service shipped.',
    ],
  },
  {
    id: 'foundations',
    year: '2021 — 2023',
    title: 'Foundations in Full-Stack Development',
    description:
      'Learned the fundamentals of web development and computer science, moving from static frontends to full applications with real backends and databases.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'MongoDB', 'Express'],
    achievements: [
      'Built and shipped first full-stack MERN applications from scratch.',
      'Developed a habit of reading documentation and source code as the default way to learn a new tool.',
    ],
  },
];
