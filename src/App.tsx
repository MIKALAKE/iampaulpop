import { useEffect } from 'react';
import { hideSplashScreen } from 'vite-plugin-splash-screen/runtime';

const App = () => {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hideSplashScreen();
      });
    });
  }, []);

  return <div className='h-screen w-screen'>Hello</div>;
};

export default App;
