import I18n from 'Locales';
import LanguageSelector from 'Components/LanguageSelector';

import MobileMenu from './MobileMenu';
import { MENU_ITEMS } from './utils';
import ThemeSwitcher from 'Components/ThemeSwitcher';

const renderTopBarItem = (item: { name: string; href: string }) => (
  <a
    key={item.name}
    aria-label={item.name}
    href={item.href}
    className='cursor-pointer rounded-full px-5 py-2 transition-all duration-100 ease-in-out hover:bg-white/10 hover:shadow-md dark:text-white dark:hover:bg-white/15'>
    {I18n.t(item.name)}
  </a>
);

const TopBar = () => (
  <section className='fixed top-0 z-50 my-2 w-full px-2'>
    <div className='bg-background/20 mx-auto w-full rounded-full py-1 shadow-md backdrop-blur-md transition-all duration-150 lg:max-w-5xl dark:bg-white/10'>
      <nav className='flex h-12 w-full items-center justify-between rounded-full px-5 text-sm text-black select-none'>
        <a
          href='/'
          aria-label='Paul Pop'
          className='text-primary transition-all duration-100 select-none hover:scale-105'>
          paul.pop
        </a>

        <div className='hidden items-center justify-center gap-5 lg:flex'>
          {MENU_ITEMS.map(renderTopBarItem)}
        </div>

        <div className='hidden lg:block'>
          <LanguageSelector />

          <ThemeSwitcher />
        </div>

        <div className='lg:hidden'>
          <MobileMenu />
        </div>
      </nav>
    </div>
  </section>
);

export default TopBar;
