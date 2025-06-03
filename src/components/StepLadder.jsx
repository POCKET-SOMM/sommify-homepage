export default function StepLadder({ steps = [] }) {
  return (
    <div className='flex flex-col items-center justify-center gap-5 mb-16 w-[400px] max-w-[94vw]'>
      {steps.map((step, i) => (
        <div
          key={i}
          className='flex text-start items-center gap-4 mb-6 h-24 border border-slate-200 rounded-lg p-6 cursor-pointer shadow-sm'
          style={{
            width: 'calc(100% - 60px)',
            margin: i % 2 !== 0 ? '0 60px 0 0' : '0 0 0 60px',
          }}
        >
          <div className='h-5 w-5 min-w-5 rounded-full bg-slate-800 flex items-center justify-center'>
            <span className='text-white font-semibold text-xs'>{i + 1}</span>
          </div>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}
