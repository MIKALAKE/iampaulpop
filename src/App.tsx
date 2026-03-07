import Navigator from 'Navigator';
import { TopBar } from 'Components';
import { LanguageProvider, ThemeProvider } from 'Providers';
import Footer from 'Components/Footer';

const App = () => (
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
);

export default App;
