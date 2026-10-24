<<<<<<< HEAD
export const projects = [
  {
    number: "01",
    title: "BrowserOS",
    description:
      "A browser-based operating system with apps, terminal, settings, and more.",
    tech: ["React", "Vite", "Zustand", "Tailwind CSS"],
    liveUrl: "https://browser-os-one.vercel.app",
    sourceUrl: "https://github.com/",
    accent: "from-emerald-500/10",
  },
  {
    number: "02",
    title: "Haadi Storage",
    description:
      "A cloud storage platform for secure file upload, sharing, and management.",
    tech: ["Node.js", "Express", "MongoDB", "AWS"],
    liveUrl: "https://mirhaadi.in",
    sourceUrl: "https://github.com/",
    accent: "from-emerald-500/10",
  },
  {
    number: "03",
    title: "Purane Gaane",
    description:
      "A minimal retro music platform for streaming old Hindi songs.",
    tech: ["React", "R2", "Howler.js", "Tailwind CSS"],
    liveUrl: "https://github.com/",
    sourceUrl: "https://github.com/",
    accent: "from-emerald-500/10",
  },
];
=======
// Project content lives here. Add preview images under public/projects/ and reference them as /projects/filename.webp.
// previewImage: flat screenshot used on the detail page. laptop: transparent laptop mockup used by the Projects section
// (add the file to public/projects/ and set src plus its pixel width/height). Leave laptop out to show a styled placeholder.
export const projects = [
  {
    id: 'browseros',
    category: 'BROWSER-BASED OPERATING SYSTEM',
    laptop: { src: '/projects/browseros-laptop.webp', width: 1200, height: 776 },
    title: 'BrowserOS',
    previewMark: 'browser.os',
    previewImage: '/projects/browseros.webp', // Example: '/projects/browseros.webp'
    shortDescription: 'A browser-based operating system with apps, terminal, settings, and more.',
    description: 'A browser-based desktop environment featuring applications, workspace interactions, and a custom interface.',
    longDescription: 'BrowserOS is a browser-based desktop environment built to bring the feel of a personal operating system to the web. It combines a desktop-style interface with interactive apps and workspace tools.',
    overview: 'The project explores how far a familiar desktop experience can be recreated with web technologies while keeping the interface responsive and easy to navigate.',
    highlights: [
      'Desktop-inspired interface with movable, app-like experiences.',
      'Built-in applications and workspace interactions.',
      'State-driven UI and responsive layouts for browser use.',
    ],
    role: 'Designed and built the frontend experience, application interactions, and shared UI patterns.',
    challenges: 'Keeping app interactions consistent while maintaining a cohesive desktop metaphor across different screen sizes.',
    tech: ['React', 'Vite', 'Zustand', 'Tailwind CSS'],
    url: 'https://browser-os-one.vercel.app/',
    sourceUrl: 'https://github.com/saifraja07/browser-OS',
  },
  {
    id: 'storageapp',
    category: 'CLOUD STORAGE SAAS',
    laptop: { src: '/projects/haadi-storage-laptop.webp', width: 1200, height: 745 },
    title: 'Haadi Storage',
    previewMark: 'haadi / storage',
    previewImage: '/projects/haadi-storage.webp', // Example: '/projects/haadi-storage.webp'
    shortDescription: 'A cloud storage platform for secure file upload, sharing, and management.',
    description: 'A secure cloud storage platform with subscriptions, file management, storage limits, and global CDN delivery.',
    longDescription: 'Haadi Storage is a cloud storage application focused on secure file management, clear storage limits, and a straightforward experience for uploading and accessing files.',
    overview: 'The app combines a React frontend with a Node.js API, persistent metadata, object storage, and subscription-aware storage quotas. It is designed around practical account and file-management workflows.',
    highlights: [
      'File upload, organization, and download workflows.',
      'Storage quotas and subscription plans with backend validation.',
      'Cloud object storage and CDN delivery for user files.',
      'Authentication, profile management, and administrative tooling.',
    ],
    role: 'Full-stack development, cloud deployment, storage integration, and production troubleshooting.',
    challenges: 'Coordinating file objects, database metadata, quota accounting, and subscription state so the UI and backend remain consistent.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Cloudflare R2'],
    url: 'https://mirhaadi.in',
    sourceUrl: 'https://github.com/saifraja07/storageApp-frontend',
  },
  {
    id: 'observability-stack',
    category: 'OBSERVABILITY & INFRASTRUCTURE',
    laptop: { src: '/projects/observability-laptop.webp', width: 1200, height: 748 },
    title: 'Observability Stack',
    previewMark: 'logs · metrics · traces',
    previewImage: '/projects/observability.webp', // Example: '/projects/observability.webp'
    shortDescription: 'Application logs, metrics, and distributed traces with an LGTM-style stack.',
    description: 'An observability setup for application logs, metrics, and distributed traces using Prometheus, Grafana, Loki, Alloy, and OpenTelemetry on EC2.',
    longDescription: 'A hands-on observability implementation for a Node.js application, bringing logs, metrics, and traces together to make production behavior easier to understand and debug.',
    overview: 'The stack collects application telemetry and makes it available for investigation through dashboards, log queries, and trace context. It is configured around a self-hosted Linux deployment.',
    highlights: [
      'Prometheus metrics for request counts, failures, and latency.',
      'Centralized application logs with Grafana Alloy and Loki.',
      'OpenTelemetry instrumentation for distributed tracing.',
      'Grafana dashboards and alerting experiments for operational visibility.',
    ],
    role: 'Implemented the instrumentation and telemetry pipeline, then tested and debugged it on an EC2-hosted backend.',
    challenges: 'Ensuring instrumentation loads correctly under the process manager and keeping noisy scrape endpoints out of application telemetry.',
    tech: ['Docker', 'Prometheus', 'Grafana', 'Loki', 'Alloy', 'OpenTelemetry'],
    url: '',
    sourceUrl: 'https://github.com/saifraja07/storageApp-backend',
  },
]
>>>>>>> 6eaa3711bcdcf3c7b95d5a1ee15c09f0b7515fee
