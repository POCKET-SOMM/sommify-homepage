import { MdArrowOutward } from 'react-icons/md';

export default function ButtonFlat({
  children,
  arrow = true,
  variant = 'primary',
  disabled = false,
  href,
  ...props
}) {
  const variantStyles = {
    primary:
      'bg-slate-800 hover:bg-slate-900 text-white active:bg-slate-800 disabled:bg-slate-600 disabled:text-slate-300 disabled:hover:bg-slate-600 disabled:hover:text-slate-300',
    empty:
      'bg-transparent hover:bg-slate-100 text-slate-800 border border-slate-800 active:bg-slate-50 disabled:bg-transparent disabled:text-slate-300 disabled:border-slate-300 disabled:hover:bg-transparent',
    secondary:
      'bg-slate-200 hover:bg-slate-300 text-slate-800 active:bg-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:hover:bg-slate-100',
    // no border no bg
    transparent:
      'bg-transparent hover:bg-slate-100 text-slate-800 active:bg-slate-50 disabled:bg-transparent disabled:text-slate-300 disabled:hover:bg-transparent',
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      {...props}
      href={href}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 font-[450] rounded-full text-sm px-4 py-2 transition-colors duration-200 disabled:cursor-default ${variantStyles[variant]}`}
      style={{ minWidth: '120px', ...props.style }}
    >
      {children}

      {arrow && <MdArrowOutward className='text-lg' />}
    </Component>
  );
}
