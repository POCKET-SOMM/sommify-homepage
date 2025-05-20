import { useEffect, useRef, useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { useClickOutside } from '../hooks';

export default function Dropdown({
  relative = true,
  children,
  menuContent,
  menuClassName,
  menuStyle,
  menuAlign = 'right',

  onHover,

  closeOnClickOutside = true,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useClickOutside(ref, () => closeOnClickOutside && !onHover && setOpen(false));

  // if onHover is true set open to true if hovered for 500ms
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (onHover) {
      if (!hovered) {
        setOpen(false);
      }

      const timeout = setTimeout(() => {
        if (hovered) {
          setOpen(true);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [hovered]);

  const renderMenuContent = (props) => {
    // if menuContent is a function, call it with props
    if (typeof menuContent === 'function') {
      return menuContent(props);
    } else {
      return menuContent;
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: relative ? 'relative' : 'static',
      }}
    >
      <div onClick={() => setOpen(!open)} {...props}>
        {children}
      </div>

      {open && (
        <DropdownMenu
          menuAlign={menuAlign}
          className={menuClassName}
          style={menuStyle}
        >
          {renderMenuContent({ close: () => setOpen(false) })}
        </DropdownMenu>
      )}
    </div>
  );
}
