import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import NavBar from './components/organisms/NavBar';
import Home from './pages/Home';
import Museum from './pages/Museum';
import Vault from './pages/Vault';
import TestShirt from './pages/TestShirt';

function AnimatedRoutes() {
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

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <AnimatedRoutes />
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
      </CartProvider>
    </BrowserRouter>
  );
}
