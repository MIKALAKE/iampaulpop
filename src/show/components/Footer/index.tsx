import dayjs from 'dayjs';

import I18n from 'Locales';

const Footer = () => (
  <footer className='border-border border-t px-6 py-8'>
    <div className='container mx-auto flex max-w-5xl flex-col items-center justify-center sm:flex-row'>
      <p className='text-muted-foreground font-mono text-xs'>
        {I18n.t('general:buildBy')} · {dayjs().year()}
      </p>
    </div>
  </footer>
);

export default Footer;
