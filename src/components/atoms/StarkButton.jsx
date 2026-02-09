import { motion } from 'framer-motion';
import styles from './StarkButton.module.css';

const VARIANT_CLASS_MAP = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
};

export default function StarkButton({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...rest
}) {
  return (
    <motion.button
      type={type}
      className={`${styles.base} ${VARIANT_CLASS_MAP[variant] || styles.primary} ${disabled ? styles.disabled : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
