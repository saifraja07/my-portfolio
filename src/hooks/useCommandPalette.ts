import { useCallback, useState } from 'react';
import { useKeyboardShortcut } from './useKeyboardShortcut';

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useKeyboardShortcut('k', toggle, { meta: true });

  return { isOpen, open, close, toggle };
}
