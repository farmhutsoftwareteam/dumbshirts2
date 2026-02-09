import { Link, useParams, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useOrder } from '../../hooks/useOrders';
import StarkSelect from '../../components/atoms/StarkSelect';
import StatusBadge from '../../components/atoms/StatusBadge';
import styles from './AdminOrderDetail.module.css';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function AdminOrderDetail() {
  const { id } = useParams();
  const { order, items, loading, updateStatus } = useOrder(id);

  if (loading) {
    return <p className={styles.loading}>LOADING ORDER...</p>;
  }

  if (!order) {
    return <Navigate to="/admin/orders" replace />;
  }

  const handleStatusChange = async (e) => {
    try {
      await updateStatus(e.target.value);
      toast('STATUS UPDATED');
    } catch {
      toast('UPDATE FAILED');
    }
  };

  return (
    <div className={styles.page}>
      <Link to="/admin/orders" className={styles.backLink}>
        &larr; ORDERS
      </Link>

      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>{order.order_number}</h1>
          <p className={styles.date}>
            {new Date(order.created_at).toLocaleDateString()} at{' '}
            {new Date(order.created_at).toLocaleTimeString()}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className={styles.grid}>
        {/* ── Order Info ─────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ORDER INFO</h2>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Customer</span>
            <span>{order.customer_name || '—'}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Email</span>
            <span>{order.customer_email}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Total</span>
            <span className={styles.total}>R{order.total || 0}</span>
          </div>

          {order.notes && (
            <div className={styles.notes}>
              <span className={styles.infoLabel}>Notes</span>
              <p>{order.notes}</p>
            </div>
          )}

          <StarkSelect
            label="UPDATE STATUS"
            options={STATUS_OPTIONS}
            value={order.status}
            onChange={handleStatusChange}
          />
        </section>

        {/* ── Line Items ─────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>LINE ITEMS</h2>

          {items.length === 0 ? (
            <p className={styles.empty}>No items</p>
          ) : (
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div>
                    <span className={styles.itemDrop}>
                      #{item.products?.drop_number || '???'}
                    </span>
                    <span className={styles.itemTitle}>
                      {item.products?.title || 'Unknown product'}
                    </span>
                  </div>
                  <span className={styles.itemPrice}>R{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
