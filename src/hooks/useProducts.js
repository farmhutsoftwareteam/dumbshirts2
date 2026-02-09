import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import staticProducts, {
  getAvailableProducts,
  getSoldProducts,
  getProductByDropNumber,
} from '../data/products';

const useSupabase = import.meta.env.VITE_USE_SUPABASE === 'true' && supabase;

/** Transform a Supabase snake_case row into the camelCase shape components expect. */
function transformProduct(row) {
  return {
    id: row.id,
    dropNumber: row.drop_number,
    title: row.title,
    memeOrigin: row.meme_origin,
    material: row.material,
    price: row.price,
    status: row.status,
    soldDate: row.sold_date,
    dimensions: row.dimensions,
    video: row.video_url,
    images: {
      hero: row.image_hero,
      macro1: row.image_macro1,
      macro2: row.image_macro2,
      macro3: row.image_macro3,
    },
  };
}

/**
 * Fetch products list from Supabase (or static fallback).
 * @param {'all' | 'available' | 'sold'} filter
 */
export function useProducts(filter = 'all') {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!useSupabase) {
      let data = staticProducts;
      if (filter === 'available') data = getAvailableProducts();
      if (filter === 'sold') data = getSoldProducts();
      setProducts(data);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (filter === 'available') {
        query = query.eq('status', 'available');
      } else if (filter === 'sold') {
        query = query.eq('status', 'sold');
      }

      const { data, error: err } = await query;

      if (cancelled) return;

      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }

      setProducts((data || []).map(transformProduct));
      setLoading(false);
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, [filter]);

  return { products, loading, error };
}

/**
 * Fetch a single product by drop number.
 * @param {string} dropNumber — e.g. "001"
 */
export function useProduct(dropNumber) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!dropNumber) {
      setLoading(false);
      return;
    }

    const padded = String(dropNumber).padStart(3, '0');

    if (!useSupabase) {
      setProduct(getProductByDropNumber(padded));
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);

      const { data, error: err } = await supabase
        .from('products')
        .select('*')
        .eq('drop_number', padded)
        .single();

      if (cancelled) return;

      if (err) {
        setError(err.message);
        setProduct(null);
        setLoading(false);
        return;
      }

      setProduct(data ? transformProduct(data) : null);
      setLoading(false);
    }

    fetchProduct();
    return () => { cancelled = true; };
  }, [dropNumber]);

  return { product, loading, error };
}
