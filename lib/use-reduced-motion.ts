import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const media = matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/**
 * Like motion's useReducedMotion, but the server and first client render
 * agree (false), which avoids a hydration mismatch for reduced-motion users.
 */
export const useReducedMotionSafe = () =>
  useSyncExternalStore(
    subscribe,
    () => matchMedia(QUERY).matches,
    () => false
  );
