import { Moon, Sun } from 'lucide-react';

import I18n from 'Locales';
import { track } from 'Helpers/analytics';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'Components/ui/dropdown-menu';
import { Button } from 'Components/ui/button';
import { useTheme } from 'Providers/ThemeProvider';

const ThemeSwitcher = () => {
  const { setTheme: applyTheme } = useTheme();

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    track('theme_change', { theme });
    applyTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 dark:text-white' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-white' />
          <span className='sr-only'>{I18n.t('general:changeTheme')}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {I18n.t('general:light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {I18n.t('general:dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          {I18n.t('general:system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
