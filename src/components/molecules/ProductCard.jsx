import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Type from '../atoms/Type';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { dropNumber, title, status, images, video, price, memeOrigin } = product;
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isSold = status === 'sold';

  const handleClick = () => {
    navigate(`/drop/${dropNumber}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.article
      className={`${styles.card} ${isSold ? styles.sold : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      whileHover={isSold ? undefined : { y: -4 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className={styles.imageContainer}>
        {video ? (
          <video
            src={video}
            className={styles.heroImage}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={images?.hero || images?.[0]}
            alt={`${title} — DUMBSHIRTS Drop #${dropNumber} ${isSold ? '(Sold)' : ''}`}
            className={`${styles.heroImage} ${imageLoaded ? styles.imageLoaded : styles.imageLoading}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        )}
        <div className={styles.dropBadge}>
          <Type variant="xs" weight={600} as="span">
            Item #{dropNumber}
          </Type>
        </div>
        {isSold && (
          <div className={styles.archivedOverlay}>
            <span className={styles.archivedText}>Removed</span>
          </div>
        )}
      </div>

      <div className={styles.meta}>
        <Type variant="md" weight={600}>
          {title}
        </Type>
        <Type variant="sm" opacity={0.6} as="span">
          {memeOrigin}
        </Type>
      </div>
    </motion.article>
  );
}
