import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import StarkInput from '../atoms/StarkInput';
import StarkTextarea from '../atoms/StarkTextarea';
import StarkSelect from '../atoms/StarkSelect';
import MediaUploadZone from '../molecules/MediaUploadZone';
import StarkButton from '../atoms/StarkButton';
import styles from './ProductForm.module.css';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'available', label: 'Available' },
  { value: 'sold', label: 'Sold' },
];

export default function ProductForm({
  defaultValues,
  onSubmit,
  onDelete,
  saving,
  isEdit,
  mediaState,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: defaultValues || {
      drop_number: '',
      title: '',
      meme_origin: '',
      material: '',
      price: '',
      status: 'draft',
      dimensions: '',
      sort_order: 0,
      video_url: '',
      image_hero: '',
      image_macro1: '',
      image_macro2: '',
      image_macro3: '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const watchedValues = watch();

  const handleMediaUpload = async (file, slot) => {
    if (!mediaState) return;
    try {
      const url = await mediaState.upload(file, watchedValues.drop_number || 'temp', slot);
      setValue(slot === 'video' ? 'video_url' : `image_${slot}`, url);
    } catch {
      // Error handled by upload hook
    }
  };

  const handleMediaRemove = (field) => {
    setValue(field, '');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* ── Identity ─────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>IDENTITY</h2>

        <div className={styles.row}>
          <StarkInput
            label="DROP NUMBER"
            placeholder="001"
            error={errors.drop_number?.message}
            {...register('drop_number', { required: 'Drop number is required' })}
          />
          <StarkInput
            label="SORT ORDER"
            type="number"
            placeholder="0"
            {...register('sort_order', { valueAsNumber: true })}
          />
        </div>

        <StarkInput
          label="TITLE"
          placeholder="Product title"
          error={errors.title?.message}
          {...register('title', { required: 'Title is required' })}
        />
      </section>

      {/* ── Description ──────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>DESCRIPTION</h2>

        <StarkTextarea
          label="MEME ORIGIN"
          rows={4}
          placeholder="Memetic expression. Origin: ..."
          {...register('meme_origin')}
        />

        <StarkTextarea
          label="MATERIAL"
          rows={3}
          placeholder="400GSM Egyptian cotton..."
          {...register('material')}
        />

        <StarkInput
          label="DIMENSIONS"
          placeholder="L 76cm x W 58cm"
          {...register('dimensions')}
        />
      </section>

      {/* ── Pricing & Status ─────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>PRICING & STATUS</h2>

        <div className={styles.row}>
          <StarkInput
            label="PRICE (ZAR)"
            type="number"
            placeholder="1000"
            error={errors.price?.message}
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Must be positive' },
            })}
          />

          <StarkSelect
            label="STATUS"
            options={STATUS_OPTIONS}
            {...register('status')}
          />
        </div>
      </section>

      {/* ── Media ────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>MEDIA</h2>

        <div className={styles.mediaGrid}>
          <MediaUploadZone
            label="HERO IMAGE"
            currentUrl={watchedValues.image_hero}
            onUpload={(f) => handleMediaUpload(f, 'hero')}
            onRemove={() => handleMediaRemove('image_hero')}
            uploading={mediaState?.uploading}
            progress={mediaState?.progress}
          />

          <MediaUploadZone
            label="MACRO 1"
            currentUrl={watchedValues.image_macro1}
            onUpload={(f) => handleMediaUpload(f, 'macro1')}
            onRemove={() => handleMediaRemove('image_macro1')}
            uploading={mediaState?.uploading}
            progress={mediaState?.progress}
          />

          <MediaUploadZone
            label="MACRO 2"
            currentUrl={watchedValues.image_macro2}
            onUpload={(f) => handleMediaUpload(f, 'macro2')}
            onRemove={() => handleMediaRemove('image_macro2')}
            uploading={mediaState?.uploading}
            progress={mediaState?.progress}
          />

          <MediaUploadZone
            label="MACRO 3"
            currentUrl={watchedValues.image_macro3}
            onUpload={(f) => handleMediaUpload(f, 'macro3')}
            onRemove={() => handleMediaRemove('image_macro3')}
          />
        </div>

        <MediaUploadZone
          label="VIDEO"
          currentUrl={watchedValues.video_url}
          accept="video/*"
          onUpload={(f) => handleMediaUpload(f, 'video')}
          onRemove={() => handleMediaRemove('video_url')}
        />

        <StarkInput
          label="VIDEO URL (OR UPLOAD ABOVE)"
          placeholder="https://..."
          {...register('video_url')}
        />
      </section>

      {/* ── Actions ──────────────────────────────── */}
      <div className={styles.actions}>
        <StarkButton type="submit" variant="primary" disabled={saving}>
          {saving ? 'SAVING...' : isEdit ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
        </StarkButton>

        {isEdit && onDelete && (
          <StarkButton type="button" variant="ghost" onClick={onDelete} className={styles.deleteBtn}>
            DELETE
          </StarkButton>
        )}
      </div>
    </form>
  );
}
