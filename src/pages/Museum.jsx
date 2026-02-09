import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, fadeUp, stagger } from '../utils/animations';
import { getProductByDropNumber } from '../data/products';
import { useCart } from '../context/CartContext';
import MacroGallery from '../components/organisms/MacroGallery';
import ScarcityMarker from '../components/molecules/ScarcityMarker';
import StarkButton from '../components/atoms/StarkButton';
import Line from '../components/atoms/Line';
import styles from './Museum.module.css';

export default function Museum() {
  const { dropNumber } = useParams();
  const product = getProductByDropNumber(dropNumber);
  const { addToCart, cart } = useCart();

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const isSold = product.status === 'sold';
  const isInCart = cart.some((item) => item.dropNumber === product.dropNumber);

  const handleAcquire = () => {
    if (!isSold && !isInCart) {
      addToCart(product);
    }
  };

  return (
    <motion.div
      className={`${styles.page} ${styles.pageBottom}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <Link to="/" className={styles.backLink}>
        &larr; Return to Index
      </Link>

      <Line direction="horizontal" spacing="md" />

      <motion.div
        className={styles.grid}
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.div className={styles.details} variants={fadeUp}>
          <span className={styles.dropLabel}>Item #{product.dropNumber}</span>
          <h1 className={styles.title}>{product.title}</h1>
          <ScarcityMarker />
          <p className={styles.origin}>{product.memeOrigin}</p>

          <Line direction="horizontal" spacing="md" />

          <table className={styles.specsTable}>
            <tbody>
              <tr>
                <td>Composition</td>
                <td>{product.material}</td>
              </tr>
              <tr>
                <td>Dimensions</td>
                <td>{product.dimensions}</td>
              </tr>
              <tr>
                <td>Edition</td>
                <td>1 of 1 in existence</td>
              </tr>
              <tr>
                <td>Classification</td>
                <td>{isSold ? `Archived ${product.soldDate}` : 'Available for acquisition'}</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <motion.div className={styles.gallery} variants={fadeUp}>
          <MacroGallery images={product.images} video={product.video} />
        </motion.div>
      </motion.div>

      <div className={styles.stickyFooter}>
        <div className={styles.footerInner}>
          {isSold ? (
            <>
              <span className={styles.price}>${product.price}</span>
              <span className={styles.soldBadge}>Removed from circulation</span>
            </>
          ) : (
            <>
              <span className={styles.price}>${product.price}</span>
              <StarkButton
                variant="primary"
                onClick={handleAcquire}
                disabled={isInCart}
              >
                {isInCart ? 'Selection locked' : 'Acquire artifact'}
              </StarkButton>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
