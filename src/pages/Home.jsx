import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../utils/animations';
import products from '../data/products';
import TheFeed from '../components/organisms/TheFeed';
import Line from '../components/atoms/Line';
import styles from './Home.module.css';

export default function Home() {
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
        <p className={styles.subtitle}>{products.length} artifacts — each one of one in existence</p>
      </header>
      <Line direction="horizontal" spacing="lg" />
      <TheFeed products={products} />
    </motion.div>
  );
}
