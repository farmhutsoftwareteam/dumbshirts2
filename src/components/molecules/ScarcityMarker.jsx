import styles from './ScarcityMarker.module.css';

export default function ScarcityMarker({ className = '' }) {
  return (
    <div className={`${styles.marker} ${className}`}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>1 of 1 in existence</span>
    </div>
  );
}
