import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarkInput from '../atoms/StarkInput';
import StarkButton from '../atoms/StarkButton';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({
  open,
  title = 'CONFIRM DELETE',
  message = 'This action cannot be undone.',
  confirmWord = 'DELETE',
  onConfirm,
  onCancel,
}) {
  const [input, setInput] = useState('');

  const isMatch = input.toUpperCase() === confirmWord.toUpperCase();

  const handleConfirm = () => {
    if (isMatch) {
      setInput('');
      onConfirm();
    }
  };

  const handleCancel = () => {
    setInput('');
    onCancel();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleCancel}
        >
          <motion.div
            className={styles.dialog}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.message}>{message}</p>

            <StarkInput
              label={`TYPE "${confirmWord}" TO CONFIRM`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={confirmWord}
              autoFocus
            />

            <div className={styles.actions}>
              <StarkButton variant="ghost" onClick={handleCancel}>
                CANCEL
              </StarkButton>
              <StarkButton
                variant="primary"
                onClick={handleConfirm}
                disabled={!isMatch}
                className={styles.deleteBtn}
              >
                DELETE
              </StarkButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
