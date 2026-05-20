/** Stable SVG numbers across SSR and client (avoids FP hydration drift). */
export function svgCoord(value: number, precision = 2): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
