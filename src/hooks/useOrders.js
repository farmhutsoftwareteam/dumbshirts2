import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useOrders(filter = 'all') {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    setOrders(data || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, refetch: fetchOrders };
}

export function useOrder(id) {
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!supabase || !id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const [orderRes, itemsRes] = await Promise.all([
      supabase.from('orders').select('*').eq('id', id).single(),
      supabase.from('order_items').select('*, products(*)').eq('order_id', id),
    ]);

    setOrder(orderRes.data);
    setItems(itemsRes.data || []);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const updateStatus = async (status) => {
    if (!supabase || !id) return;
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    if (error) throw error;
    setOrder((prev) => (prev ? { ...prev, status } : prev));
  };

  return { order, items, loading, updateStatus, refetch: fetchOrder };
}
