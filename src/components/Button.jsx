// import tailwind colors
import React from 'react';
import colors from 'tailwindcss/colors';
import { motion, useTime, useTransform } from 'framer-motion';

export default function Button({
  size = 'md',
  pill = false,
  type = 'default',
  children,
  onClick = () => {},
  className,
  disabled,
  cta = false,
  style = {},
  ...props
}) {
  const time = useTime();
  const rotate = useTransform(time, [0, 3000], [0, 360], {
    clamp: false,
  });
  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, ${colors.blue[200]} 50%, ${colors.blue[700]} 70%, ${colors.blue[500]} 80%, ${colors.blue[700]} 90%, ${colors.blue[200]} 100%)`;
  });

  const [hover, setHover] = React.useState(false);

  const height = {
    xs: 28,
    sm: 32,
    md: 36,
    lg: 40,
    xl: 44,
  }[size];

  const fontSize =
    {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-base',
    }[size] || 'text-sm';

  const rounded = `rounded-${pill ? 'full' : 'md'}`;

  const buttonProps = {
    primary: {
      whileHover: {
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.25)',
      },
      whileTap: {
        // background: `linear-gradient(180deg, ${colors.gray[600]} 0%, ${colors.gray[700]} 100%)`,
        backgroundColor: colors.blue[700],
      },
      animate: {
        // borderColor: colors.gray[700],
        borderColor: colors.blue[600],
        // backgroundColor: colors.teal[600],
        // background: `linear-gradient(180deg, ${colors.gray[500]} 0%, ${colors.gray[700]} 100%)`,
        backgroundColor: colors.blue[600],
        color: colors.white,
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.0)',
      },
    },
    secondary: {
      whileHover: {
        backgroundColor: colors.slate[100],
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      whileTap: { backgroundColor: colors.slate[200] },
      animate: {
        backgroundColor: colors.slate[50],
        borderColor: colors.slate[200],
        color: colors.slate[700],
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.0)',
      },
    },
    default: {
      whileHover: {
        backgroundColor: colors.slate[25],
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      whileTap: { backgroundColor: colors.slate[100] },
      animate: {
        backgroundColor: colors.white,
        borderColor: colors.slate[200],
        color: colors.slate[700],
        boxShadow:
          '0 2px 4px rgba(0, 0, 0, 0.04), inset 0 2px 4px rgba(0, 0, 0, 0.0)',
      },
    },
  }[type];

  return (
    <div className='relative flex-block items-center justify-center z-10'>
      {cta && (
        <motion.div
          className={`absolute -inset-[1px] p-2 -z-10`}
          // glow blue on hover
          initial={false}
          animate={{
            boxShadow: hover
              ? `0 0 0px 0px ${colors.blue[100]}`
              : `0 0 10px 0px ${colors.blue[100]}`,
          }}
          transition={{ duration: 0.1 }}
          style={{
            background: rotatingBg,
            borderRadius: 7,
          }}
        />
      )}

      <motion.button
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        style={{
          height,
          minWidth: 80,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'default' : 'pointer',
          border: cta ? 'none' : `1px solid ${colors.slate[200]}`,
          ...style,
        }}
        onClick={() => !disabled && onClick()}
        className={`font-medium shadow-sm px-3 flex items-center justify-center ${rounded} ${fontSize} ${className}`}
        initial={false}
        transition={{ duration: 0.1 }}
        {...buttonProps}
        {...props}
        {...(disabled && {
          disabled: true,
          'aria-disabled': true,
          whileHover: {},
          whileTap: {},
        })}
      >
        {children}
      </motion.button>
    </div>
  );
}
