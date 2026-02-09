import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import styles from './NavBar.module.css';

const NAV_LINKS = [
  { path: '/', label: 'Index' },
  { path: '/vault', label: 'Archive' },
];

export default function NavBar() {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        Dumbshirts
      </Link>

      <div className={styles.links}>
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  className={styles.underline}
                  layoutId="activeLink"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}

        {cartCount > 0 && (
          <Link to="/cart" className={styles.cartLink}>
            Claim ({cartCount})
          </Link>
        )}
      </div>
    </nav>
  );
}
