import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredText, setHoveredText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList.contains("interactive") ||
        target.classList.contains("cursor-hover");

      setIsHovering(isInteractive);

      // Check for special hover text
      if (target.classList.contains("explore-hover")) {
        setHoveredText("EXPLORE");
      } else if (isInteractive) {
        setHoveredText("");
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoveredText("");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none;
        }
        a, button, .interactive, .cursor-hover {
          cursor: none;
        }
      `}</style>

      {/* Custom cursor dot */}
      <motion.div
        className="cursor-dot bg-foreground"
        animate={{
          x: mousePosition.x - (isHovering ? 30 : 6),
          y: mousePosition.y - (isHovering ? 30 : 6),
          width: isHovering ? 60 : 12,
          height: isHovering ? 60 : 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        {hoveredText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center text-xs font-syne font-bold text-background"
          >
            {hoveredText}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
