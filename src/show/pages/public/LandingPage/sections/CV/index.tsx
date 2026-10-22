import { motion } from 'framer-motion';

import I18n from 'Locales';
import { track } from 'Helpers/analytics';
import { SectionHeading } from 'Components';
import { Button } from 'Components/ui/button';
import cvFile from 'Assets/Paul_Pop_CV.pdf';

const CV = () => {
  return (
    <section id='cv' className='w-full py-24'>
      <div className='container mx-auto max-w-5xl'>
        {/* index shifted 07→06 while Fitness is hidden; restore to 07 when Fitness returns */}
        <SectionHeading index='06' title={I18n.t('general:cv')} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mt-10 flex flex-col items-start gap-6'>
          <p className='text-muted-foreground max-w-2xl leading-relaxed'>
            {I18n.t('landingPage:cv.description')}
          </p>
          <Button asChild>
            <a
              href={cvFile}
              download='Paul_Pop_CV.pdf'
              onClick={() => track('cv_download', { location: 'cv_section' })}>
              {I18n.t('landingPage:cv.download')}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CV;
