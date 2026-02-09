import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../utils/animations';
import { useProducts } from '../hooks/useProducts';
import TheFeed from '../components/organisms/TheFeed';
import Line from '../components/atoms/Line';
import styles from './Home.module.css';

export default function Home() {
  const { products, loading } = useProducts();

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
        <h1 className={styles.title}>Index</h1>
        {!loading && (
          <p className={styles.subtitle}>{products.length} {products.length === 1 ? 'artifact' : 'artifacts'} — each one of one in existence</p>
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
      ) : (
        <TheFeed products={products} />
      )}
    </motion.div>
  );
}
