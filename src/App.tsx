import { HelmetProvider } from 'react-helmet-async';

import Navigator from 'Navigator';
import { TopBar } from 'Components';
import Footer from 'Components/Footer';
import { LanguageProvider, ThemeProvider } from 'Providers';

const App = () => (
  <HelmetProvider>
    <ThemeProvider defaultTheme='system' storageKey='paul-pop-ui-theme'>
      <div className='h-dvh w-screen'>
        <LanguageProvider>
          <TopBar />

          <main className='overflow-y-auto'>
            <Navigator />
          </main>

          <Footer />
        </LanguageProvider>
      </div>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
