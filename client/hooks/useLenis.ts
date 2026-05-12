import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
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

      // Store cleanup ref on window for unmount
      (window as any).__lenisCleanup = () => lenis.destroy();
    });

    return () => {
      (window as any).__lenisCleanup?.();
    };
  }, []);
}
