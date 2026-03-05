import { useEffect } from 'react';
import { hideSplashScreen } from 'vite-plugin-splash-screen/runtime';

import Navigator from 'Navigator';

const App = () => {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hideSplashScreen();
      });
    });
  }, []);

  return (
    <div className='h-screen w-screen'>
      <Navigator />
    </div>
  );
};

export default App;
