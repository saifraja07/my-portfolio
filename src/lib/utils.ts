export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function formatYear(year: number): string {
  return String(year);
}

/**
 * Converts a polar position (radius as a % of container, angle in degrees)
 * into a top/left percentage pair usable for absolute positioning.
 */
export function polarToPercent(radiusPercent: number, angleDegrees: number) {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    left: 50 + radiusPercent * Math.cos(radians),
    top: 50 + radiusPercent * Math.sin(radians),
  };
}
