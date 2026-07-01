import { motion } from 'framer-motion';

import I18n from 'Locales';
import * as Logos from 'Assets/Logos';
import { SectionHeading } from 'Components';

const skillsData = [
  {
    key: 'frontend' as const,
    labelKey: 'landingPage:skills.categories.frontend',
    skills: [
      'React',
      'JavaScript',
      'TypeScript',
      'Redux',
      'TailwindCSS',
      'Storybook',
      'Shadcn',
      'Motion',
      'ReactRouter',
      'CSS',
    ],
  },
  {
    key: 'tool' as const,
    labelKey: 'landingPage:skills.categories.tools',
    skills: ['Git', 'GitHub', 'GitLab', 'Figma', 'Netlify', 'Vercel', 'Vite', 'VSCode', 'Yarn'],
  },
];

const renderCategory = (category: (typeof skillsData)[number], i: number) => (
  <motion.div
    key={category.key}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}>
    <h3 className='text-primary mb-4 font-mono text-xs tracking-wider uppercase'>
      {I18n.t(category.labelKey)}
    </h3>

    <div className='flex flex-wrap gap-2'>{category.skills.map(renderSkill)}</div>
  </motion.div>
);

const renderSkill = (skill: string, i: number) => {
  const logoSrc = Logos[skill.toLowerCase() as keyof typeof Logos];

  return (
    <motion.span
      key={skill}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.09 }}
      className='bg-secondary text-secondary-foreground border-border hover:border-primary/50 text-md flex items-center rounded-sm border px-3 py-1.5 font-mono transition-colors'>
      <img src={logoSrc} alt={`${skill} logo`} className='mr-2 h-8 w-8' />

      {skill}
    </motion.span>
  );
};

const Skills = () => (
  <section id='skills' className='w-full py-24'>
    <div className='container mx-auto max-w-5xl'>
      {/* index shifted 04→03 while Fitness is hidden; restore to 04 when Fitness returns */}
      <SectionHeading index='03' title={I18n.t('general:skills')} />

      <div className='mt-10 grid gap-8 md:grid-cols-1'>{skillsData.map(renderCategory)}</div>
    </div>
  </section>
);

export default Skills;
