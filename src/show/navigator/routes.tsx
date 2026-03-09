import { createBrowserRouter } from 'react-router';

import Pages from 'Pages';
import PATHS from './paths';
import Root from './Layouts/Root';

export const router = createBrowserRouter([
  {
    path: PATHS.DEFAULT_PATH,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Pages.PUBLIC.LandingPage />,
      },
      {
        path: '*',
        element: <Pages.PUBLIC.NotFound />,
      },
    ],
  },
]);
