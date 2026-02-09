import { motion } from 'framer-motion';
import { pageVariants, pageTransition, fadeUp, stagger } from '../utils/animations';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/molecules/ProductCard';
import Line from '../components/atoms/Line';
import styles from './Vault.module.css';

export default function Vault() {
  const { products: soldProducts, loading } = useProducts('sold');

  return (
    <motion.div
      className={styles.page}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Archive</h1>
        {!loading && (
          <p className={styles.subtitle}>
            {soldProducts.length} artifact{soldProducts.length !== 1 ? 's' : ''} — permanently removed from circulation
          </p>
        )}
      </header>
      <Line direction="horizontal" spacing="lg" />

      {loading ? (
        <motion.p
          className={styles.loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          LOADING ARTIFACTS...
        </motion.p>
      ) : soldProducts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>No artifacts archived</p>
        </div>
      ) : (
        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {soldProducts.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
