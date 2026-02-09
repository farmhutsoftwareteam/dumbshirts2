import styles from './StatusBadge.module.css';

const STATUS_MAP = {
  available: 'available',
  sold: 'sold',
  draft: 'draft',
  pending: 'pending',
  confirmed: 'confirmed',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
};

export default function StatusBadge({ status, className = '' }) {
  const key = STATUS_MAP[status] || 'draft';

  return (
    <span className={`${styles.badge} ${styles[key]} ${className}`}>
      {status}
    </span>
  );
}
