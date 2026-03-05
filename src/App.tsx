import { useEffect } from 'react';
import { hideSplashScreen } from 'vite-plugin-splash-screen/runtime';

import Navigator from 'Navigator';
import { TopBar } from 'Components';
import { LanguageProvider, ThemeProvider } from 'Providers';

const App = () => {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hideSplashScreen();
      });
    });
  }, []);

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='h-dvh w-screen'>
        <LanguageProvider>
          <TopBar />

          <div className='overflow-y-auto'>
            <Navigator />
          </div>
        </LanguageProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
