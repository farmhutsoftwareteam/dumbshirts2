import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/organisms/NavBar';
import Home from './pages/Home';
import Museum from './pages/Museum';
import Vault from './pages/Vault';
import TestShirt from './pages/TestShirt';

// Lazy-load admin pages — never ships to storefront visitors
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminProductEditor = lazy(() => import('./pages/admin/AdminProductEditor'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminOrderDetail = lazy(() => import('./pages/admin/AdminOrderDetail'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

function AdminFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#121212',
      color: 'rgba(245,245,245,0.38)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
    }}>
      LOADING...
    </div>
  );
}

function StorefrontRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/drop/:dropNumber" element={<Museum />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/test" element={<TestShirt />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <NavBar />}
      {isAdmin ? (
        <Suspense fallback={<AdminFallback />}>
          <AuthProvider>
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductEditor />} />
                <Route path="products/:id" element={<AdminProductEditor />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Suspense>
      ) : (
        <StorefrontRoutes />
      )}
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: '#1E1E1E',
            border: '1px solid #2A2A2A',
            color: '#F5F5F5',
            borderRadius: 0,
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            letterSpacing: '0.02em',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}
