import type { Project } from '@/types/project';

/**
 * Problem/approach/highlights reflect real project history. Screenshots,
 * live URLs, and detailed implementation/challenges/results/lessons are
 * still unfilled for now — those sections stay hidden on the project pages
 * until there's real content for them (see ProjectDetails' conditional
 * rendering), rather than showing placeholder text to visitors.
 */
export const projects: Project[] = [
  {
    slug: 'browseros',
    title: 'BrowserOS',
    description:
      'A browser-based desktop OS simulation — a window manager, virtual file system, and a suite of in-browser apps running entirely on the client.',
    category: 'Full-Stack',
    year: 2025,
    status: 'In Progress',
    featured: true,
    priority: 1,
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand', 'Supabase'],
    thumbnail: '/assets/projects/browseros/thumbnail.svg',
    screenshots: [],
    liveUrl: '',
    githubUrl: '',
    problem:
      'BrowserOS wasn\'t built to solve an external problem — it started as an exploration of how far a browser-based desktop environment could be pushed: a window manager, a virtual file system, and a set of interoperating apps, all running client-side.',
    approach:
      'A desktop shell handles window management — drag, resize, z-index stacking — on top of a client-side VirtualFS layer. Each app (Calculator, Community guestbook, Internet, Desktop Buddy) is built as an isolated module that plugs into the shell rather than being wired directly into it.',
    architecture: {
      nodes: [
        { id: 'shell', label: 'Desktop Shell', description: 'Window manager & dock' },
        { id: 'vfs', label: 'VirtualFS', description: 'Client-side file system layer' },
        { id: 'apps', label: 'App Modules', description: 'Calculator, Internet, Community, etc.' },
        { id: 'supabase', label: 'Supabase', description: 'Guestbook data + Edge Functions' },
      ],
      edges: [
        { from: 'shell', to: 'vfs' },
        { from: 'shell', to: 'apps' },
        { from: 'apps', to: 'supabase', label: 'Community app' },
      ],
    },
    implementation: [],
    challenges: [],
    results: [],
    lessons: [],
    highlights: [
      'Window manager with drag/resize and layering',
      'Pixel-art retro chrome & multi-theme support',
      'Client-side VirtualFS',
    ],
    relatedProjectSlugs: ['haadi-cloud', 'purane-gaane'],
  },
  {
    slug: 'haadi-cloud',
    title: 'Haadi Cloud',
    description:
      'A personal cloud storage application with subscription billing, a global upload manager, and a full light/dark theme system.',
    category: 'Full-Stack',
    year: 2025,
    status: 'In Progress',
    featured: true,
    priority: 2,
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Razorpay', 'Google OAuth'],
    thumbnail: '/assets/projects/haadi-cloud/thumbnail.svg',
    screenshots: [],
    liveUrl: '',
    githubUrl: '',
    problem: 'Off-the-shelf cloud storage means trusting a third party with the billing relationship. Haadi Cloud was built to own that full stack directly — storage, auth, and subscription billing — end to end.',
    approach:
      'Cloudflare R2 handles object storage and JWT handles auth, with Razorpay powering subscription billing across Free/Pro/Premium tiers. A global upload manager tracks byte-level progress and rolling upload speed across concurrent uploads.',
    architecture: {
      nodes: [
        { id: 'client', label: 'Client', description: 'React SPA' },
        { id: 'api', label: 'API', description: 'Storage & billing endpoints' },
        { id: 'storage', label: 'Object Storage' },
        { id: 'razorpay', label: 'Razorpay', description: 'Subscription billing' },
      ],
      edges: [
        { from: 'client', to: 'api' },
        { from: 'api', to: 'storage' },
        { from: 'api', to: 'razorpay', label: 'billing events' },
      ],
    },
    implementation: [],
    challenges: [],
    results: [],
    lessons: [],
    highlights: [
      'Razorpay subscription billing with a payment overlay',
      'Global upload manager with rolling speed calculation',
      'Full light/dark theme system',
    ],
    relatedProjectSlugs: ['browseros'],
  },
  {
    slug: 'purane-gaane',
    title: 'Purane Gaane',
    description:
      'A retro Hindi music web app with a rotating vinyl-disk player, category-based playlists, and a nostalgic Indian poster aesthetic.',
    category: 'Full-Stack',
    year: 2025,
    status: 'In Progress',
    featured: false,
    priority: 3,
    technologies: ['React', 'Vite', 'HTML5 Audio API', 'Cloudflare R2'],
    thumbnail: '/assets/projects/purane-gaane/thumbnail.svg',
    screenshots: [],
    liveUrl: '',
    githubUrl: '',
    problem: 'Most music apps aren\'t built around one specific listening mood. Purane Gaane was built specifically around the experience of listening to old Hindi film music and ghazals — down to the vinyl-record visual metaphor.',
    approach:
      'A single-page React app streams audio from Cloudflare R2, with playback state synced to a rotating vinyl-disk animation and playlists organized by category (Ghazals, Old Hindi).',
    architecture: {
      nodes: [
        { id: 'client', label: 'Client', description: 'React SPA + Audio API' },
        { id: 'r2', label: 'Cloudflare R2', description: 'Public audio bucket' },
      ],
      edges: [{ from: 'client', to: 'r2', label: 'stream audio' }],
    },
    implementation: [],
    challenges: [],
    results: [],
    lessons: [],
    highlights: [
      'Rotating vinyl disk synced to playback',
      'Category-based playlist architecture',
      'Cloudflare R2 audio hosting',
    ],
    relatedProjectSlugs: ['browseros'],
  },
];
