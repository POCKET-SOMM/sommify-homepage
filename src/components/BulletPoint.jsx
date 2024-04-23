import { CgArrowRight } from 'react-icons/cg';

export default function BulletPoint({ children, dehighlight, list }) {
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
      {/* {list && (
        <CgArrowRight
          style={{
            // width: '10px',
            // height: '2px',
            // background: '#00050a',
            opacity: 0.2,
            position: 'absolute',
            top: '0.2em',
            left: -20,
            // borderRadius: 99,
          }}
        />
      )} */}
      {list && (
        <div
          style={{
            width: '4px',
            height: '4px',
            background: '#000',
            position: 'absolute',
            top: '0.75em',
            left: -19,
            borderRadius: 99,
          }}
        />
      )}
      {children}
    </li>
  );
}
