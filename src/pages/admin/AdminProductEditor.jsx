import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';
import { useMediaUpload } from '../../hooks/useMediaUpload';
import ProductForm from '../../components/organisms/ProductForm';
import ConfirmDialog from '../../components/molecules/ConfirmDialog';
import styles from './AdminProductEditor.module.css';

export default function AdminProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const mediaState = useMediaUpload();

  useEffect(() => {
    if (!isEdit || !supabase) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        toast('PRODUCT NOT FOUND');
        navigate('/admin/products', { replace: true });
        return;
      }

      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [id, isEdit, navigate]);

  const handleSubmit = async (formData) => {
    if (!supabase) return;
    setSaving(true);

    try {
      if (isEdit) {
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', id);
        if (error) throw error;
        toast('PRODUCT UPDATED');
      } else {
        const { error } = await supabase
          .from('products')
          .insert(formData);
        if (error) throw error;
        toast('PRODUCT CREATED');
        navigate('/admin/products', { replace: true });
      }
    } catch (err) {
      toast(err.message || 'SAVE FAILED');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!supabase) return;
    setShowDelete(false);

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast('PRODUCT DELETED');
      navigate('/admin/products', { replace: true });
    } catch (err) {
      toast(err.message || 'DELETE FAILED');
    }
  };

  if (loading) {
    return <p className={styles.loading}>LOADING PRODUCT...</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <Link to="/admin/products" className={styles.backLink}>
            &larr; PRODUCTS
          </Link>
          <h1 className={styles.title}>
            {isEdit ? `EDIT #${product?.drop_number || ''}` : 'NEW PRODUCT'}
          </h1>
        </div>
      </div>

      <ProductForm
        defaultValues={product}
        onSubmit={handleSubmit}
        onDelete={isEdit ? () => setShowDelete(true) : undefined}
        saving={saving}
        isEdit={isEdit}
        mediaState={mediaState}
      />

      <ConfirmDialog
        open={showDelete}
        title="DELETE PRODUCT"
        message={`This will permanently delete drop #${product?.drop_number}. This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
