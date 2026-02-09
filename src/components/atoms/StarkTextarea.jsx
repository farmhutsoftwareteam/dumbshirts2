import styles from './StarkTextarea.module.css';

export default function StarkTextarea({
  label,
  error,
  className = '',
  rows = 4,
  ...rest
}) {
  return (
    <div className={`${styles.field} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        rows={rows}
        className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
