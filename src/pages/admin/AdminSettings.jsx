import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import StarkInput from '../../components/atoms/StarkInput';
import StarkTextarea from '../../components/atoms/StarkTextarea';
import StarkButton from '../../components/atoms/StarkButton';
import styles from './AdminSettings.module.css';

export default function AdminSettings() {
  const { settings, loading, updateSetting } = useSiteSettings();

  // Announcement
  const [annText, setAnnText] = useState('');
  const [annVisible, setAnnVisible] = useState(false);

  // Store status
  const [storeOpen, setStoreOpen] = useState(true);
  const [storeMessage, setStoreMessage] = useState('');

  // Brand
  const [tagline, setTagline] = useState('');

  useEffect(() => {
    if (settings.announcement) {
      setAnnText(settings.announcement.text || '');
      setAnnVisible(settings.announcement.visible || false);
    }
    if (settings.store_status) {
      setStoreOpen(settings.store_status.open ?? true);
      setStoreMessage(settings.store_status.message || '');
    }
    if (settings.brand) {
      setTagline(settings.brand.tagline || '');
    }
  }, [settings]);

  const [savingSection, setSavingSection] = useState(null);

  const saveSection = async (key, value) => {
    setSavingSection(key);
    try {
      await updateSetting(key, value);
      toast('SETTING SAVED');
    } catch {
      toast('SAVE FAILED');
    } finally {
      setSavingSection(null);
    }
  };

  if (loading) {
    return <p className={styles.loading}>LOADING SETTINGS...</p>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>

      {/* ── Announcement ─────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ANNOUNCEMENT BAR</h2>

        <StarkInput
          label="ANNOUNCEMENT TEXT"
          value={annText}
          onChange={(e) => setAnnText(e.target.value)}
          placeholder="Free shipping on all orders"
        />

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={annVisible}
            onChange={(e) => setAnnVisible(e.target.checked)}
            className={styles.checkbox}
          />
          VISIBLE
        </label>

        <StarkButton
          variant="secondary"
          disabled={savingSection === 'announcement'}
          onClick={() => saveSection('announcement', { text: annText, visible: annVisible })}
        >
          {savingSection === 'announcement' ? 'SAVING...' : 'SAVE ANNOUNCEMENT'}
        </StarkButton>
      </section>

      {/* ── Store Status ─────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>STORE STATUS</h2>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={storeOpen}
            onChange={(e) => setStoreOpen(e.target.checked)}
            className={styles.checkbox}
          />
          STORE OPEN
        </label>

        <StarkTextarea
          label="CLOSED MESSAGE"
          value={storeMessage}
          onChange={(e) => setStoreMessage(e.target.value)}
          rows={2}
          placeholder="Store is temporarily closed"
        />

        <StarkButton
          variant="secondary"
          disabled={savingSection === 'store_status'}
          onClick={() => saveSection('store_status', { open: storeOpen, message: storeMessage })}
        >
          {savingSection === 'store_status' ? 'SAVING...' : 'SAVE STORE STATUS'}
        </StarkButton>
      </section>

      {/* ── Brand ────────────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>BRAND</h2>

        <StarkInput
          label="TAGLINE"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="one of one in existence"
        />

        <StarkButton
          variant="secondary"
          disabled={savingSection === 'brand'}
          onClick={() => saveSection('brand', { tagline })}
        >
          {savingSection === 'brand' ? 'SAVING...' : 'SAVE BRAND'}
        </StarkButton>
      </section>
    </div>
  );
}
