import styles from './StarkInput.module.css';

export default function StarkInput({
  label,
  error,
  className = '',
  type = 'text',
  ...rest
}) {
  return (
    <div className={`${styles.field} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
