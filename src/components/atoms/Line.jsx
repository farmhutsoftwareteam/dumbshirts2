import styles from './Line.module.css';

const SPACING_MAP = {
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
};

export default function Line({
  direction = 'horizontal',
  spacing = 'md',
  className = '',
  ...rest
}) {
  const spacingClass = SPACING_MAP[spacing] || SPACING_MAP.md;

  if (direction === 'vertical') {
    return (
      <div
        className={`${styles.vertical} ${spacingClass} ${className}`}
        role="separator"
        aria-orientation="vertical"
        {...rest}
      />
    );
  }

  return (
    <hr
      className={`${styles.horizontal} ${spacingClass} ${className}`}
      {...rest}
    />
  );
}
