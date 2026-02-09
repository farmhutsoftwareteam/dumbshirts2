import { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import OrderTable from '../../components/organisms/OrderTable';
import styles from './AdminOrders.module.css';

const FILTERS = ['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const [filter, setFilter] = useState('all');
  const { orders, loading } = useOrders(filter);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Orders</h1>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className={styles.loading}>LOADING ORDERS...</p>
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  );
}
