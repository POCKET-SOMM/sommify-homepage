import App from '../App';
import Redirect from '../pages/Redirect';

export default [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'joinourjourney',
    element: <Redirect />,
  },
];
