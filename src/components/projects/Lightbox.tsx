import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import type { ProjectScreenshot } from '@/types/project';

interface LightboxProps {
  screenshots: ProjectScreenshot[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ screenshots, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const screenshot = screenshots[index];
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [index]);

  useEffect(() => {
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && index < screenshots.length - 1) {
        onNavigate(index + 1);
      } else if (event.key === 'ArrowLeft' && index > 0) {
        onNavigate(index - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, screenshots.length, onClose, onNavigate]);

  if (!screenshot) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 px-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={screenshot.alt}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-3xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted hover:text-ink"
        >
          <X size={16} strokeWidth={1.6} />
        </button>

        {failed ? (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-hairline bg-void-elevated">
            <ImageOff size={24} className="text-ink-faint" strokeWidth={1.6} />
          </div>
        ) : (
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            className="max-h-[75vh] w-full rounded-lg border border-hairline object-contain"
            onError={() => setFailed(true)}
          />
        )}

        {screenshot.caption && <p className="mt-3 text-center text-sm text-ink-muted">{screenshot.caption}</p>}

        {screenshots.length > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate(index - 1)}
              disabled={index === 0}
              aria-label="Previous image"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted disabled:opacity-30"
            >
              <ChevronLeft size={16} strokeWidth={1.6} />
            </button>
            <span className="font-mono text-xs text-ink-faint">
              {index + 1} / {screenshots.length}
            </span>
            <button
              type="button"
              onClick={() => onNavigate(index + 1)}
              disabled={index === screenshots.length - 1}
              aria-label="Next image"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted disabled:opacity-30"
            >
              <ChevronRight size={16} strokeWidth={1.6} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
