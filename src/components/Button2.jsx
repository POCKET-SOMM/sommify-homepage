import { motion } from 'framer-motion';

export default function Button2({
  children,
  primary,
  transparent,
  disabled,
  ...props
}) {
  const colors = {
    transparentIdle: 'rgba(256, 256, 256, 0)',
    transparentHover: 'rgba(256, 256, 256, 0)',
    defaultIdle: 'rgba(256, 256, 256, 0.28)',
    defaultHover: 'rgba(256, 256, 256, 0.38)',
    primaryIdle: '#000000d0',
    primaryHover: '#000000ff',
  };

  const backgroundIdle = transparent
    ? colors.transparentIdle
    : primary
    ? colors.primaryIdle
    : colors.defaultIdle;
  const backgroundHover = transparent
    ? colors.transparentHover
    : primary
    ? colors.primaryHover
    : colors.defaultHover;

  const color = '#ffffff';
  const colorHover = '#ffffff';
  const borderRadius = 999;

  return (
    <motion.button
      animate={{
        background: backgroundIdle,
        color: color,
        opacity: disabled ? 0.5 : 1,
      }}
      whileHover={{
        background: backgroundHover,
        color: colorHover,
      }}
      initial={false}
      style={{
        borderRadius,
        fontSize: '14px !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        cursor: disabled ? 'default' : 'pointer',
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
