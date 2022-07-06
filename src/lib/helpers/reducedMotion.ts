// Determine if our animations should play or not.
export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
