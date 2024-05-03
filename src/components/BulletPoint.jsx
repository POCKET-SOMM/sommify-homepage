import { useDimensions } from '../hooks';

export default function BulletPoint({ children, dehighlight, list }) {
  const { sm } = useDimensions();

  return (
    <li
      style={{
        listStyle: 'none',
        position: 'relative',
        paddingLeft: sm ? 20 : 0,
        opacity: dehighlight ? 0.5 : 1,
        marginBottom: '0.5em',
      }}
    >
      {list && (
        <div
          style={{
            width: '4px',
            height: '4px',
            background: '#000',
            position: 'absolute',
            top: '0.75em',
            left: sm ? 0 : -19,
            borderRadius: 99,
          }}
        />
      )}
      {children}
    </li>
  );
}
