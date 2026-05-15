import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoveredText, setHoveredText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices to prevent annoying trailing dots
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Center the transform origins so x/y maps to the exact center of the elements
    gsap.set([cursor, ring], { xPercent: -50, yPercent: -50 });

    // GSAP quickTo is incredibly performant vs React state mapping
    const xMoveCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yMoveCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });
    
    // The ring trails slightly behind the core cursor
    const xMoveRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yMoveRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
      xMoveRing(e.clientX);
      yMoveRing(e.clientY);

      const target = e.target as HTMLElement;
      
      // Use closest() to handle hovering over children (e.g. SVG or span inside an <a>)
      const interactiveNode = target.closest("a, button, .interactive, .cursor-hover");
      setIsHovering(!!interactiveNode);

      if (interactiveNode && interactiveNode.classList.contains("explore-hover")) {
        setHoveredText("EXPLORE");
      } else {
        setHoveredText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate the cursor shapes independently from mouse tracking
  useEffect(() => {
    if (!cursorRef.current || !ringRef.current) return;
    
    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (isHovering) {
      // Shrink core dot, expand ring into a solid circle
      gsap.to(cursorRef.current, { scale: 0, duration: 0.2, ease: "expo.out" });
      gsap.to(ringRef.current, { 
        scale: hoveredText ? 4 : 2.5, 
        backgroundColor: "rgba(255, 255, 255, 1)", 
        borderColor: "transparent",
        duration: 0.3, 
        ease: "expo.out" 
      });
    } else {
      // Reset to default ring and core dot
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2, ease: "expo.out" });
      gsap.to(ringRef.current, { 
        scale: 1, 
        backgroundColor: "rgba(255, 255, 255, 0)", 
        borderColor: "rgba(255, 255, 255, 0.4)",
        duration: 0.3, 
        ease: "expo.out" 
      });
    }
  }, [isHovering, hoveredText]);

  return (
    <>
      <style>{`
        /* Force cursor hide globally when this component is mounted */
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />

      {/* Trailing ring / expanding hover circle */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center hidden md:flex"
      >
        <span 
          className="text-[6px] font-syne font-bold tracking-widest text-black opacity-0 transition-opacity duration-300"
          style={{ opacity: hoveredText ? 1 : 0 }}
        >
          {hoveredText}
        </span>
      </div>
    </>
  );
}
