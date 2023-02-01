import { useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import colors from '../data/colors';

export default function Button({ children, style, className, ...props }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      {...props}
      className={'clickable position-relative ' + className}
      style={{
        color: 'white',
        background: colors.blue,
        // boxShadow: hover ? '0px 0px 2px 0px ' + colors.blue : '',
        paddingBlock: '.7em',
        paddingInline: '2.4em',
        borderRadius: 999,
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {hover && (
        <CgChevronRight
          size='1.5em'
          style={{ position: 'absolute', right: 13 }}
        />
      )}
    </div>
  );
}
