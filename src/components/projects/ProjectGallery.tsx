import { useRef, useState } from 'react';
import { ImageOff, Expand } from 'lucide-react';
import type { ProjectScreenshot } from '@/types/project';
import { Lightbox } from './Lightbox';
import { cn } from '@/lib/utils';

interface GalleryImageProps {
  screenshot: ProjectScreenshot;
  large?: boolean;
  onOpen: () => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}

function GalleryImage({ screenshot, large = false, onOpen, triggerRef }: GalleryImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={cn('overflow-hidden rounded-lg border border-hairline', large && 'sm:col-span-2')}>
      <button
        ref={triggerRef}
        type="button"
        onClick={onOpen}
        disabled={failed}
        aria-label={failed ? `Image unavailable: ${screenshot.alt}` : `View larger: ${screenshot.alt}`}
        className="group relative flex aspect-video w-full items-center justify-center bg-void-elevated disabled:cursor-default"
      >
        {failed ? (
          <ImageOff size={20} className="text-ink-faint" strokeWidth={1.6} />
        ) : (
          <>
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              loading="lazy"
              width={1280}
              height={720}
              className={cn(
                'h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out',
                loaded ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0',
              )}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-void/0 opacity-0 transition-opacity duration-200 group-hover:bg-void/40 group-hover:opacity-100">
              <Expand size={18} className="text-ink" strokeWidth={1.6} />
            </span>
          </>
        )}
      </button>
      {screenshot.caption && (
        <figcaption className="px-3 py-2 text-xs text-ink-faint">{screenshot.caption}</figcaption>
      )}
    </figure>
  );
}

export function ProjectGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (screenshots.length === 0) return null;

  const handleClose = () => {
    if (openIndex !== null) triggerRefs.current[openIndex]?.focus();
    setOpenIndex(null);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {screenshots.map((screenshot, index) => (
        <GalleryImage
          key={screenshot.src}
          screenshot={screenshot}
          large={index === 0 && screenshots.length > 1}
          onOpen={() => setOpenIndex(index)}
          triggerRef={(el) => {
            triggerRefs.current[index] = el;
          }}
        />
      ))}

      {openIndex !== null && (
        <Lightbox
          screenshots={screenshots}
          index={openIndex}
          onClose={handleClose}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
