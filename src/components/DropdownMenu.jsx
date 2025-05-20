import { AnimatePresence, motion } from 'framer-motion';

export default function DropdownMenu({
  menuAlign = 'right',
  style,
  children,
  className,
}) {
  return (
    <AnimatePresence>
      <motion.div
        key='dropdown-menu'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`overflow-hidden absolute bg-white border border-slate-200 rounded-lg shadow-sm p-1 flex flex-col items-start text-sm font-medium z-50 ${className}`}
        style={{
          top: menuAlign.includes('top') ? 'auto' : 'calc(100% + 12px)',
          bottom: menuAlign.includes('top') ? 'calc(100% + 12px)' : 'auto',
          right: menuAlign.includes('right') ? 0 : 'auto',
          left: menuAlign.includes('left') ? 0 : 'auto',
          ...style,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
