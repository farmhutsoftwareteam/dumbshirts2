/* ============================================================
   HEAVY HELVETICA — useScrollProgress
   Returns scroll progress as a number from 0 to 100.
   Uses a passive scroll listener for performance.
   ============================================================ */

import { useState, useEffect } from "react";

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollable = docHeight - winHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const percent = (scrollY / scrollable) * 100;
      setProgress(Math.min(100, Math.max(0, percent)));
    }

    // Calculate initial position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return progress;
}
