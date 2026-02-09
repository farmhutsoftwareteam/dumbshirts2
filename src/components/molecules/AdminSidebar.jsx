import { NavLink } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', end: true },
  { path: '/admin/products', label: 'Products' },
  { path: '/admin/orders', label: 'Orders' },
  { path: '/admin/settings', label: 'Settings' },
];

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
