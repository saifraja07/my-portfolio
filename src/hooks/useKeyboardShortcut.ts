import { useEffect } from 'react';

interface ShortcutOptions {
  /** Require Cmd (Mac) or Ctrl (other) held down. */
  meta?: boolean;
  /** Skip firing while the user is typing in an input/textarea/contenteditable. */
  ignoreWhenTyping?: boolean;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

export function useKeyboardShortcut(key: string, callback: () => void, options: ShortcutOptions = {}) {
  const { meta = false, ignoreWhenTyping = false } = options;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (ignoreWhenTyping && isTypingTarget(event.target)) return;

      const modifierSatisfied = meta ? event.metaKey || event.ctrlKey : true;
      if (modifierSatisfied && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, meta, ignoreWhenTyping]);
}
