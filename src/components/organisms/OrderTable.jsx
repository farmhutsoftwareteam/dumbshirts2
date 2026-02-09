import { Link } from 'react-router-dom';
import StatusBadge from '../atoms/StatusBadge';
import styles from './OrderTable.module.css';

export default function OrderTable({ orders }) {
  if (orders.length === 0) {
    return <p className={styles.empty}>NO ORDERS FOUND</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ORDER</th>
            <th>DATE</th>
            <th>CUSTOMER</th>
            <th>STATUS</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className={styles.orderNum}>{order.order_number}</td>
              <td className={styles.date}>
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              <td>{order.customer_email}</td>
              <td>
                <StatusBadge status={order.status} />
              </td>
              <td>R{order.total || 0}</td>
              <td>
                <Link to={`/admin/orders/${order.id}`} className={styles.viewLink}>
                  VIEW
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
