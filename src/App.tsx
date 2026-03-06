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
    <ThemeProvider defaultTheme='system' storageKey='paul-pop-ui-theme'>
      <div className='h-dvh w-screen'>
        <LanguageProvider>
          <TopBar />

          <main className='overflow-y-auto'>
            <Navigator />
          </main>
        </LanguageProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
