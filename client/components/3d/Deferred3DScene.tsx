import { useState, useEffect, lazy, Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { isWebGLSupported } from "@/lib/gpu";

const Canvas3D = lazy(() => import("@/components/3d/Canvas3D"));
const ScrollSceneGeometry = lazy(
  () => import("@/components/3d/ScrollSceneGeometry"),
);
const Hero3DText = lazy(() => import("@/components/3d/Hero3DText"));

/**
 * Defers loading of the entire Three.js 3D scene until after the page
 * is interactive. This prevents Three.js from blocking FCP/LCP/TBT.
 *
 * Strategy:
 * 1. Wait for `requestIdleCallback` (or 3s fallback on Safari).
 * 2. Only then lazy-load the Three.js chunks.
 * 3. Uses a single Canvas to avoid duplicate WebGL contexts.
 */
export default function Deferred3DScene() {
  const [shouldRender, setShouldRender] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(false);

  useEffect(() => {
    // Detect WebGL support
    const supported = isWebGLSupported();
    setWebGLSupported(supported);
    if (!supported) return;

    // Defer 3D scene until browser is idle
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(
        () => setShouldRender(true),
        { timeout: 4000 }, // max 4s delay
      );
      return () => cancelIdleCallback(id);
    } else {
      // Safari fallback
      const timer = setTimeout(() => setShouldRender(true), 3000);
      return () => clearTimeout(timer);
    }
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
