import { UniverseScene } from './UniverseScene';

/**
 * The orbital system is a single implementation shared by every device —
 * only its footprint responds to the viewport (see UniverseScene's
 * responsive width). Page-level navigation (sidebar vs. mobile dock) is
 * handled separately in Layout and is unaffected by this component.
 */
export function Universe() {
  return <UniverseScene />;
}
