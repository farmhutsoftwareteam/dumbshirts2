import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StarkInput from '../../components/atoms/StarkInput';
import StarkButton from '../../components/atoms/StarkButton';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authLoading) return null;
  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>DUMBSHIRTS</h1>
        <p className={styles.subtitle}>ADMIN ACCESS</p>

        {error && <p className={styles.error}>{error}</p>}

        <StarkInput
          label="EMAIL"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@dumbshirts.co"
          required
          autoComplete="email"
        />

        <StarkInput
          label="PASSWORD"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          autoComplete="current-password"
        />

        <StarkButton
          type="submit"
          variant="primary"
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
        </StarkButton>
      </form>
    </div>
  );
}
