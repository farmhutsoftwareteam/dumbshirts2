import styles from './StarkSelect.module.css';

export default function StarkSelect({
  label,
  error,
  options = [],
  className = '',
  ...rest
}) {
  return (
    <div className={`${styles.field} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={`${styles.select} ${error ? styles.selectError : ''}`}
        {...rest}
      >
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const label = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
