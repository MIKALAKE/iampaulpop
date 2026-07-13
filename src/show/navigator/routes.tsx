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
      // Same page, served under its own URL so each language gets its own
      // crawlable <head>. See the seo-i18n plugin in vite.config.ts.
      {
        path: PATHS.EN_PATH,
        element: <Pages.PUBLIC.LandingPage />,
      },
      {
        path: '*',
        element: <Pages.PUBLIC.NotFound />,
      },
    ],
  },
]);
