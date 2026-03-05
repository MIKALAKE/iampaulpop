import { useState } from 'react';

import I18n from 'Locales';
import IconButton from 'Components/IconButton';
import ThemeSwitcher from 'Components/ThemeSwitcher';
import LanguageSelector from 'Components/LanguageSelector';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from 'Components/ui/sheet';

import { MENU_ITEMS } from '../utils';

const renderTopBarItem = (
  setOpen: (arg: boolean) => void,
  item: { name: string; href: string },
) => (
  <a
    key={item.name}
    aria-label={item.name}
    href={item.href}
    onClick={setOpen.bind(null, false)}
    className='hover:text-primary underline-offset-2 hover:underline'>
    {I18n.t(item.name)}
  </a>
);

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen.bind(null, !open)}>
      <SheetTrigger asChild onClick={setOpen.bind(null, true)}>
        <IconButton iconName='menu' className='dark:text-white' />
      </SheetTrigger>
      <SheetContent className='data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]'>
        <SheetHeader>
          <SheetTitle>
            <a
              aria-label='Paul Pop'
              onClick={setOpen.bind(null, false)}
              className='text-primary transition-all duration-100 select-none hover:scale-105'>
              paul.pop
            </a>
          </SheetTitle>
        </SheetHeader>

        <div className='flex h-full flex-col items-start justify-start gap-5 p-4'>
          {MENU_ITEMS.map(renderTopBarItem.bind(null, setOpen))}

          <div className='flex gap-4'>
            <LanguageSelector />

            <ThemeSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
