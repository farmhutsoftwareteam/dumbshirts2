/* ============================================================
   HEAVY HELVETICA — usePixelatedLoad
   Tracks image load state for pixelation CSS transitions.
   Returns a ref to attach to an <img> and an isLoaded boolean.
   ============================================================ */

import { useRef, useState, useEffect, useCallback } from "react";

export default function usePixelatedLoad() {
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    // If the image is already cached / loaded before the listener attaches
    if (img.complete && img.naturalWidth > 0) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 150);
      return () => clearTimeout(timer);
    }

    img.addEventListener("load", handleLoad);
    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, [handleLoad]);

  return { imageRef, isLoaded };
}
