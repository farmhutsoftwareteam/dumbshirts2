import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ProductTable from '../../components/organisms/ProductTable';
import StarkButton from '../../components/atoms/StarkButton';
import styles from './AdminProducts.module.css';

const FILTERS = ['all', 'available', 'sold', 'draft'];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data } = await query;
      setProducts(data || []);
      setLoading(false);
    }

    fetchProducts();
  }, [filter]);

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Products</h1>
        <Link to="/admin/products/new">
          <StarkButton variant="primary">NEW PRODUCT</StarkButton>
        </Link>
      </div>

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
        <p className={styles.loading}>LOADING PRODUCTS...</p>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
}
