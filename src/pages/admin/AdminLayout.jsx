import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/molecules/AdminSidebar';
import styles from './AdminLayout.module.css';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <p className={styles.loadingText}>AUTHENTICATING...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default function AdminLayout() {
  const { signOut, user } = useAuth();

  return (
    <RequireAuth>
      <div className={styles.layout}>
        <header className={styles.header}>
          <Link to="/admin" className={styles.logo}>
            DUMBSHIRTS / ADMIN
          </Link>
          <div className={styles.headerRight}>
            <span className={styles.email}>{user?.email}</span>
            <button className={styles.signOut} onClick={signOut}>
              SIGN OUT
            </button>
          </div>
        </header>
        <div className={styles.body}>
          <AdminSidebar />
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
