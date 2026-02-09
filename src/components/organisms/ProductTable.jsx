import { Link } from 'react-router-dom';
import StatusBadge from '../atoms/StatusBadge';
import styles from './ProductTable.module.css';

export default function ProductTable({ products }) {
  if (products.length === 0) {
    return <p className={styles.empty}>NO PRODUCTS FOUND</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>DROP</th>
            <th>TITLE</th>
            <th>STATUS</th>
            <th>PRICE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className={styles.dropCell}>#{product.drop_number}</td>
              <td className={styles.titleCell}>{product.title}</td>
              <td>
                <StatusBadge status={product.status} />
              </td>
              <td>R{product.price}</td>
              <td className={styles.actionsCell}>
                <Link to={`/admin/products/${product.id}`} className={styles.editLink}>
                  EDIT
                </Link>
                <Link to={`/drop/${product.drop_number}`} className={styles.viewLink} target="_blank">
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
