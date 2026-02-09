import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import StatCard from '../../components/molecules/StatCard';
import StarkButton from '../../components/atoms/StarkButton';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    available: 0,
    sold: 0,
    draft: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    async function fetchStats() {
      const [available, sold, draft, orders] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('status', 'available'),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('status', 'sold'),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        available: available.count || 0,
        sold: sold.count || 0,
        draft: draft.count || 0,
        recentOrders: orders.data || [],
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Dashboard</h1>
        <Link to="/admin/products/new">
          <StarkButton variant="primary">NEW PRODUCT</StarkButton>
        </Link>
      </div>

      {loading ? (
        <p className={styles.loading}>LOADING...</p>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <StatCard label="Available" value={stats.available} />
            <StatCard label="Sold" value={stats.sold} />
            <StatCard label="Draft" value={stats.draft} />
            <StatCard label="Total" value={stats.available + stats.sold + stats.draft} />
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Recent Orders</h2>
            {stats.recentOrders.length === 0 ? (
              <p className={styles.empty}>No orders yet</p>
            ) : (
              <div className={styles.orderList}>
                {stats.recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    to={`/admin/orders/${order.id}`}
                    className={styles.orderRow}
                  >
                    <span className={styles.orderNumber}>{order.order_number}</span>
                    <span className={styles.orderEmail}>{order.customer_email}</span>
                    <span className={styles.orderStatus}>{order.status}</span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.actions}>
              <Link to="/admin/products/new">
                <StarkButton variant="secondary">CREATE PRODUCT</StarkButton>
              </Link>
              <Link to="/admin/products">
                <StarkButton variant="secondary">VIEW ALL PRODUCTS</StarkButton>
              </Link>
              <Link to="/admin/orders">
                <StarkButton variant="secondary">VIEW ALL ORDERS</StarkButton>
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
