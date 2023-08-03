export default function Redirect({
  to = 'https://sommify.notion.site/Make-wine-easy-with-sommifyAI-e0abba39d0e44f488c78e231d115d014',
  ...props
}) {
  window.location.replace(to);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      Redirecting...
    </div>
  );
}
