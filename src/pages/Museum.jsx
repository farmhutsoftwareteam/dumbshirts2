import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, fadeUp, stagger } from '../utils/animations';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import SEOHead, { ProductSchema } from '../components/SEOHead';
import MacroGallery from '../components/organisms/MacroGallery';
import ScarcityMarker from '../components/molecules/ScarcityMarker';
import StarkButton from '../components/atoms/StarkButton';
import Line from '../components/atoms/Line';
import styles from './Museum.module.css';

export default function Museum() {
  const { dropNumber } = useParams();
  const { product, loading } = useProduct(dropNumber);
  const { addToCart, cart } = useCart();

  if (loading) {
    return (
      <motion.div
        className={styles.page}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <motion.p
          className={styles.loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          LOADING ARTIFACT...
        </motion.p>
      </motion.div>
    );
  }

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

  const seoDescription = `${product.title} — ${product.material ? product.material.split('.')[0] : 'Heavyweight garment-dyed tee'}. R${product.price}. One of one in existence. ${isSold ? 'Archived.' : 'Available for acquisition.'}`;

  return (
    <motion.div
      className={`${styles.page} ${styles.pageBottom}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <SEOHead
        title={`${product.title} — Drop #${product.dropNumber}`}
        description={seoDescription}
        image={product.images?.hero?.startsWith('http') ? product.images.hero : undefined}
        url={`/drop/${product.dropNumber}`}
        type="product"
      />
      <ProductSchema product={product} />

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
          <MacroGallery product={product} />
        </motion.div>
      </motion.div>

      <div className={styles.stickyFooter}>
        <div className={styles.footerInner}>
          {isSold ? (
            <>
              <span className={styles.price}>R{product.price}</span>
              <span className={styles.soldBadge}>Removed from circulation</span>
            </>
          ) : (
            <>
              <span className={styles.price}>R{product.price}</span>
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
