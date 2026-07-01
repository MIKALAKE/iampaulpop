import dayjs from 'dayjs';
import { motion } from 'framer-motion';

import I18n from 'Locales';
import { SectionHeading } from 'Components';

const experiences = [
  {
    titleKey: 'landingPage:experience.frontendDeveloper',
    company: 'Fida Solutions',
    startDate: '2025-06-01',
    endDate: null,
    location: 'Remote',
    order: 1,
    achievementKeys: [
      'landingPage:experience.achievements.builtGISPlatforms',
      'landingPage:experience.achievements.developedPublicSectorApps',
      'landingPage:experience.achievements.specializedFrontendArchitectures',
      'landingPage:experience.achievements.managedReduxState',
      'landingPage:experience.achievements.craftedAccessibleUI',
      'landingPage:experience.achievements.deliveredHighPerformanceUX',
    ],
  },
  {
    titleKey: 'landingPage:experience.frontendDeveloper',
    company: 'Luminos Software',
    startDate: '2022-06-01',
    endDate: '2025-06-01',
    location: 'Cluj-Napoca',
    order: 2,
    achievementKeys: [
      'landingPage:experience.achievements.builtResponsiveUI',
      'landingPage:experience.achievements.managedComplexState',
      'landingPage:experience.achievements.optimizedPerformance',
      'landingPage:experience.achievements.collaboratedWithDesigners',
      'landingPage:experience.achievements.conductedCodeReviews',
    ],
  },
  {
    titleKey: 'landingPage:experience.qaAnalyst',
    company: 'Quantic Lab SRL',
    startDate: '2022-11-01',
    endDate: '2025-02-01',
    location: 'Cluj-Napoca',
    order: 3,
    achievementKeys: [
      'landingPage:experience.achievements.identifiedBugs',
      'landingPage:experience.achievements.collaboratedCrossFunctional',
      'landingPage:experience.achievements.gainedQAUnderstanding',
    ],
  },
];

const renderAchievement = (achievementKey: string, j: number) => (
  <li key={j} className='text-secondary-foreground flex items-start gap-3 text-sm'>
    <span className='text-primary mt-1 font-mono text-xs'>▹</span>

    {I18n.t(achievementKey)}
  </li>
);

const renderExperience = (exp: (typeof experiences)[0], i: number) => {
  const formatPeriod = (startDate: string, endDate: string | null) => {
    const start = dayjs(startDate).format('MMM YYYY');
    const end = endDate ? dayjs(endDate).format('MMM YYYY') : I18n.t('general:present');
    return `${start} — ${end}`;
  };

  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className='group'>
      <div className='mb-3 flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4'>
        <h3 className='text-foreground text-lg font-semibold'>
          {I18n.t(exp.titleKey)}

          <span className='text-primary'> @ {exp.company}</span>
        </h3>
      </div>

      <p className='text-muted-foreground mb-4 font-mono text-xs'>
        {formatPeriod(exp.startDate, exp.endDate)}
      </p>

      {exp.achievementKeys.length > 0 && (
        <ul className='space-y-2'>{exp.achievementKeys.map(renderAchievement)}</ul>
      )}
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id='experience' className='w-full py-24'>
      <div className='container mx-auto mb-12 max-w-5xl'>
        {/* index shifted 03→02 while Fitness is hidden; restore to 03 when Fitness returns */}
        <SectionHeading index='02' title={I18n.t('general:experience')} />
      </div>

      <div className='flex flex-col gap-20'>{experiences.map(renderExperience)}</div>
    </section>
  );
};

export default Experience;
