import styles from './Type.module.css';

const VARIANT_TAG_MAP = {
  xs: 'span',
  sm: 'span',
  body: 'p',
  md: 'h3',
  lg: 'h2',
  xl: 'h2',
  headline: 'h1',
};

export default function Type({
  variant = 'body',
  weight = 400,
  opacity = 1,
  as,
  children,
  className = '',
  ...rest
}) {
  const Tag = as || VARIANT_TAG_MAP[variant] || 'span';

  const opacityClass =
    opacity === 0.87
      ? styles.opacity87
      : opacity === 0.6
        ? styles.opacity60
        : '';

  return (
    <Tag
      className={`${styles.base} ${styles[variant]} ${opacityClass} ${className}`}
      style={{ fontWeight: weight }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
