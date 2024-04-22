import { useDimensions } from '../hooks';

export default function Section({ title, children }) {
  const { sm } = useDimensions();

  return (
    <section
      className='section'
      style={{
        paddingLeft: sm ? 0 : 30,
        position: 'relative',
        // borderLeft: '1px dashed #E4E9F1',
        paddingBottom: 36,
        maxWidth: 600,

        // width: 600,
        // maxWidth: 600,
        // margin: 'auto',
      }}
    >
      <div>
        <h3 style={{ position: 'relative' }}>
          {!sm && <div className='line-marker' />}
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}
