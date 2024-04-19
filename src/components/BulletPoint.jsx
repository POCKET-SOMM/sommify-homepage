import { CgArrowRight } from 'react-icons/cg';

export default function BulletPoint({ children, dehighlight }) {
  return (
    <li
      style={{
        listStyle: 'none',
        position: 'relative',
        // paddingLeft: 20,
        opacity: dehighlight ? 0.5 : 1,
        marginBottom: '0.5em',
      }}
    >
      {/* <CgArrowRight
        style={{
          // width: '10px',
          // height: '2px',
          // background: '#00050a',
          opacity: 0.2,
          position: 'absolute',
          top: '0.2em',
          left: 0,
          // borderRadius: 99,
        }}
      /> */}
      {/* <div
        style={{
          width: '10px',
          height: '2px',
          background: '#00050a',
          opacity: 0.2,
          position: 'absolute',
          top: '0.75em',
          left: 0,
          borderRadius: 99,
        }}
      /> */}
      {children}
    </li>
  );
}
