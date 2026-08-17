import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import { modalEnter } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { isAppleDevice } from '@/lib/platform';
import { buildCommandItems, copyEmailToClipboard, type CommandItem, type CommandGroup } from '@/lib/commandPaletteItems';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const GROUP_ORDER: CommandGroup[] = ['Navigation', 'Projects', 'Skills', 'Actions'];

function matches(item: CommandItem, query: string): boolean {
  const haystack = [item.label, item.description, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const handleCopyEmail = () => {
    copyEmailToClipboard().then((ok) => {
      setFeedback(ok ? 'Email copied' : "Couldn't copy — clipboard unavailable");
    });
  };

  const handleDownloadResumeResult = (result: { ok: boolean; message: string }) => {
    setFeedback(result.message);
  };

  const allItems = useMemo(
    () => buildCommandItems({ onCopyEmail: handleCopyEmail, onDownloadResume: handleDownloadResumeResult }),
    [],
  );

  const filtered = useMemo(
    () => (query.trim() ? allItems.filter((item) => matches(item, query)) : allItems),
    [allItems, query],
  );

  const groups = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: filtered.filter((item) => item.group === group),
      })).filter((section) => section.items.length > 0),
    [filtered],
  );

  const flatItems = useMemo(() => groups.flatMap((section) => section.items), [groups]);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      setQuery('');
      setActiveIndex(0);
      setFeedback(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const runItem = (item: CommandItem) => {
    item.perform({ navigate });
    if (!item.keepOpen) onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter' && flatItems[activeIndex]) {
      event.preventDefault();
      runItem(flatItems[activeIndex]);
    }
  };

  const shortcutHint = isAppleDevice() ? '⌘ K' : 'Ctrl K';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-void/70 px-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            variants={modalEnter}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search the universe"
            className="w-full max-w-lg overflow-hidden rounded-lg border border-hairline bg-void-elevated shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
              <Search size={16} className="text-ink-faint" strokeWidth={1.6} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search the universe..."
                aria-label="Search pages, projects, and skills"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <span className="hidden shrink-0 rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-ink-faint sm:inline">
                {shortcutHint}
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {flatItems.length === 0 && (
                <p className="px-4 py-3 text-sm text-ink-faint">No matches.</p>
              )}

              {groups.map((section) => (
                <div key={section.group} className="py-1">
                  <p className="px-4 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                    {section.group}
                  </p>
                  <ul role="listbox">
                    {section.items.map((item) => {
                      const flatIndex = flatItems.indexOf(item);
                      const isActive = flatIndex === activeIndex;
                      return (
                        <li key={item.id} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            onClick={() => runItem(item)}
                            onMouseEnter={() => setActiveIndex(flatIndex)}
                            className={cn(
                              'flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm text-ink-muted transition-colors',
                              isActive && 'bg-void-raised text-ink',
                            )}
                          >
                            <span className="flex flex-col">
                              <span>{item.label}</span>
                              {item.description && (
                                <span className="truncate text-xs text-ink-faint">{item.description}</span>
                              )}
                            </span>
                            {isActive && <CornerDownLeft size={14} strokeWidth={1.6} className="text-ink-faint" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div role="status" aria-live="polite" className="min-h-0">
              {feedback && (
                <p className="border-t border-hairline px-4 py-2 text-xs text-gold-soft">{feedback}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
