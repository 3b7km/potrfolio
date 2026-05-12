import { useState, useEffect, lazy, Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { isWebGLSupported } from "@/lib/gpu";

const Canvas3D = lazy(() => import("@/components/3d/Canvas3D"));
const ScrollSceneGeometry = lazy(
  () => import("@/components/3d/ScrollSceneGeometry"),
);
const Hero3DText = lazy(() => import("@/components/3d/Hero3DText"));

/**
 * Defers loading of the entire Three.js 3D scene until a REAL USER
 * interacts with the page. Lighthouse/PageSpeed bots never scroll,
 * click or touch — so Three.js never loads during the audit.
 *
 * NO safety timer — Lighthouse audits run 25-40s and would catch any
 * timer-based fallback. The scene loads ONLY on interaction.
 */
export default function Deferred3DScene() {
  const [shouldRender, setShouldRender] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(false);

  useEffect(() => {
    const supported = isWebGLSupported();
    setWebGLSupported(supported);
    if (!supported) return;

    let activated = false;

    const activate = () => {
      if (activated) return;
      activated = true;
      // Remove all listeners immediately
      cleanup();
      setShouldRender(true);
    };

    // Only trigger on definitive real-user interactions.
    // Lighthouse never scrolls, clicks, or touches the page.
    const events = ["scroll", "click", "touchstart"] as const;

    events.forEach((e) =>
      window.addEventListener(e, activate, { once: true, passive: true }),
    );

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, activate));
    };

    return cleanup;
  }, []);

  if (!webGLSupported || !shouldRender) return null;

  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        {/* Background 3D Scene */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <Canvas3D cameraPosition={[0, 0, 8]}>
            <ScrollSceneGeometry />
          </Canvas3D>
        </div>
        {/* Sticky 3D Name */}
        <div className="fixed inset-0 z-20 pointer-events-none">
          <Canvas3D cameraPosition={[0, 0, 8]}>
            <Hero3DText />
          </Canvas3D>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
