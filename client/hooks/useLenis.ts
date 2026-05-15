import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Lazy-load Lenis — it's a UX enhancement, not critical for first paint
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      
      // Store instance on window for other components to access
      (window as any).lenis = lenis;

      // Store cleanup ref on window for unmount
      (window as any).__lenisCleanup = () => {
        lenis.destroy();
        (window as any).lenis = null;
      };
    });

    return () => {
      (window as any).__lenisCleanup?.();
    };
  }, []);
}
