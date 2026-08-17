import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/components/navigation/Layout';

const Home = lazy(() => import('@/pages/Home/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('@/pages/About/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('@/pages/Projects/Projects').then((m) => ({ default: m.Projects })));
const ProjectDetails = lazy(() =>
  import('@/pages/ProjectDetails/ProjectDetails').then((m) => ({ default: m.ProjectDetails })),
);
const Experience = lazy(() => import('@/pages/Experience/Experience').then((m) => ({ default: m.Experience })));
const Skills = lazy(() => import('@/pages/Skills/Skills').then((m) => ({ default: m.Skills })));
const Writing = lazy(() => import('@/pages/Writing/Writing').then((m) => ({ default: m.Writing })));
const WritingDetails = lazy(() =>
  import('@/pages/Writing/WritingDetails').then((m) => ({ default: m.WritingDetails })),
);
const Contact = lazy(() => import('@/pages/Contact/Contact').then((m) => ({ default: m.Contact })));
const Resume = lazy(() => import('@/pages/Resume/Resume').then((m) => ({ default: m.Resume })));
const Recruiter = lazy(() => import('@/pages/Recruiter/Recruiter').then((m) => ({ default: m.Recruiter })));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound').then((m) => ({ default: m.NotFound })));

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader2 size={18} className="animate-spin text-ink-faint" strokeWidth={1.6} aria-label="Loading" />
    </div>
  );
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: 'about', element: withSuspense(<About />) },
      { path: 'projects', element: withSuspense(<Projects />) },
      { path: 'projects/:slug', element: withSuspense(<ProjectDetails />) },
      { path: 'experience', element: withSuspense(<Experience />) },
      { path: 'skills', element: withSuspense(<Skills />) },
      { path: 'writing', element: withSuspense(<Writing />) },
      { path: 'writing/:slug', element: withSuspense(<WritingDetails />) },
      { path: 'contact', element: withSuspense(<Contact />) },
      { path: 'resume', element: withSuspense(<Resume />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
  // Standalone route — deliberately outside the universe Layout (no sidebar, no
  // star field, no command palette chrome) so it stays fast and print-friendly.
  { path: 'recruiter', element: withSuspense(<Recruiter />) },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
