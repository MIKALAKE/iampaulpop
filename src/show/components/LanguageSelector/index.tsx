import I18n from 'Locales';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'Components/ui/dropdown-menu';
import CustomIcon from 'Components/CustomIcon';
import IconButton from 'Components/IconButton';
import { useLanguage } from 'Providers/LanguageProvider';

const LANGUAGES = [
  { name: 'general:romanian', icon: 'romania', value: 'ro' },
  { name: 'general:english', icon: 'great-britain', value: 'en' },
];

const renderLanguageItem = (
  changeLanguage: (_lang: string) => void,
  { name, icon, value }: (typeof LANGUAGES)[0],
) => (
  <DropdownMenuItem
    onClick={changeLanguage.bind(null, value)}
    key={name}
    className='justify-between text-sm'>
    {I18n.t(name)} <CustomIcon name={icon} className='h-4! w-4!' />
  </DropdownMenuItem>
);

const LanguageSelector = () => {
  const { changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton iconName='globe' className='dark:text-white' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuGroup>
          {LANGUAGES.map(renderLanguageItem.bind(null, changeLanguage))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
