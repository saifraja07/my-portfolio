import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { MobileBottomDock } from './MobileBottomDock';
import { CommandPalette } from './CommandPalette';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { PageTransition } from '@/components/common/PageTransition';
import { useCommandPalette } from '@/hooks/useCommandPalette';
import { siteConfig } from '@/data/profile';

export function Layout() {
  const location = useLocation();
  const commandPalette = useCommandPalette();

  return (
    <div className="min-h-screen bg-void text-ink">
      <ScrollRestoration />
      <Sidebar onOpenCommandPalette={commandPalette.open} />
      <MobileNav onOpenCommandPalette={commandPalette.open} />
      <MobileBottomDock />

      {siteConfig.availability && (
        <div className="fixed right-8 top-6 z-30 hidden lg:block">
          <StatusIndicator label="Available for work" tone="active" />
        </div>
      )}

      <main className="pt-20 lg:ml-56 lg:pt-6">
        <ErrorBoundary>
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </ErrorBoundary>
      </main>

      <CommandPalette isOpen={commandPalette.isOpen} onClose={commandPalette.close} />
    </div>
  );
}
