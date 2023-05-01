import App from '../App';

export default [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'joinourjourney',
    element: (function () {
      window.location.replace(
        'https://sommify.notion.site/Make-wine-easy-with-sommifyAI-e0abba39d0e44f488c78e231d115d014'
      );
      return null;
    })(),
  },
];
