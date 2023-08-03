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
  {
    path: 'drivesales',
    element: (
      <Redirect to='https://sommify.notion.site/Drive-sales-through-accessibility-w-sommifyAI-1ddeab3ad8d847a1a3b21683ad254941' />
    ),
  },
];
