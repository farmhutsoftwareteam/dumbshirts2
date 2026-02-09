import { useState, useRef } from 'react';
import styles from './MediaUploadZone.module.css';

export default function MediaUploadZone({
  label,
  currentUrl,
  onUpload,
  onRemove,
  accept = 'image/*',
  uploading = false,
  progress = 0,
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    e.target.value = '';
  };

  return (
    <div className={styles.zone}>
      {label && <span className={styles.label}>{label}</span>}

      {currentUrl && !uploading ? (
        <div className={styles.preview}>
          {currentUrl.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={currentUrl} className={styles.previewMedia} muted />
          ) : (
            <img src={currentUrl} alt="" className={styles.previewMedia} />
          )}
          <div className={styles.previewActions}>
            <button
              type="button"
              className={styles.changeBtn}
              onClick={() => inputRef.current?.click()}
            >
              REPLACE
            </button>
            {onRemove && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={onRemove}
              >
                REMOVE
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`${styles.dropArea} ${dragOver ? styles.dragOver : ''}`}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragOver(false)}
        >
          {uploading ? (
            <div className={styles.progressWrap}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.progressText}>{progress}%</span>
            </div>
          ) : (
            <span className={styles.dropText}>
              DROP FILE OR CLICK TO UPLOAD
            </span>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className={styles.hiddenInput}
      />
    </div>
  );
}
