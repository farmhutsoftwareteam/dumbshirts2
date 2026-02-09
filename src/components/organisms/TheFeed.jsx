import { motion } from 'framer-motion';
import ProductCard from '../molecules/ProductCard';
import styles from './TheFeed.module.css';

const fadeUp = {
  hidden: {
    y: 40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function TheFeed({ products = [] }) {
  return (
    <motion.section
      className={styles.feed}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div
          key={product.dropNumber}
          className={styles.cardContainer}
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.section>
  );
}
