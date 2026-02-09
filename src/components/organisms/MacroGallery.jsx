import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MacroGallery.module.css';

function VideoPlayer({ src }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setZoomed(true), []);
  const handleMouseLeave = useCallback(() => {
    setZoomed(false);
    setOrigin({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.zoomContainer}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        className={styles.mainMedia}
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transform: zoomed ? 'scale(2)' : 'scale(1)',
        }}
        autoPlay
        loop
        muted
        playsInline
      />
      {!zoomed && <div className={styles.zoomHint}>Hover to zoom</div>}
    </div>
  );
}

function ZoomableImage({ src, alt, index, loadedImages, onLoad }) {
  const containerRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setZoomed(true), []);
  const handleMouseLeave = useCallback(() => {
    setZoomed(false);
    setOrigin({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.zoomContainer}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        key={index}
        src={src}
        alt={alt}
        className={`${styles.mainMedia} ${loadedImages[`main-${index}`] ? styles.imageLoaded : styles.imageLoading}`}
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transform: zoomed ? 'scale(2)' : 'scale(1)',
        }}
        onLoad={onLoad}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      />
      {!zoomed && <div className={styles.zoomHint}>Hover to zoom</div>}
    </div>
  );
}

export default function MacroGallery({ images, video }) {
  const { hero, macro1, macro2, macro3 } = images;
  const allImages = [hero, macro1, macro2, macro3].filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(video ? -1 : 0);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const showingVideo = selectedIndex === -1 && video;

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageArea}>
        <AnimatePresence mode="wait">
          {showingVideo ? (
            <VideoPlayer key="video" src={video} />
          ) : (
            <ZoomableImage
              key={selectedIndex}
              src={allImages[selectedIndex]}
              alt={`Product view ${selectedIndex + 1}`}
              index={selectedIndex}
              loadedImages={loadedImages}
              onLoad={() => handleImageLoad(`main-${selectedIndex}`)}
            />
          )}
        </AnimatePresence>
      </div>

      <div className={styles.thumbnailStrip}>
        {video && (
          <button
            className={`${styles.thumbnail} ${selectedIndex === -1 ? styles.thumbnailActive : ''}`}
            onClick={() => setSelectedIndex(-1)}
            aria-label="View video"
            type="button"
          >
            <div className={styles.videoThumb}>
              <span className={styles.playIcon}>&#9654;</span>
            </div>
          </button>
        )}
        {allImages.map((src, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${index === selectedIndex ? styles.thumbnailActive : ''}`}
            onClick={() => setSelectedIndex(index)}
            aria-label={`View image ${index + 1}`}
            type="button"
          >
            <img
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className={`${styles.thumbnailImage} ${loadedImages[`thumb-${index}`] ? styles.imageLoaded : styles.imageLoading}`}
              onLoad={() => handleImageLoad(`thumb-${index}`)}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
