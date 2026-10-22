import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import I18n from 'Locales';
import { track } from 'Helpers/analytics';
import { SectionHeading } from 'Components';
import invitatioVideo from 'Assets/projects/invitatio.mp4';
import invitatioPoster from 'Assets/projects/invitatio-poster.webp';
import vanillaVideo from 'Assets/projects/vanilla.mp4';
import vanillaPoster from 'Assets/projects/vanilla-poster.webp';

import ProjectVideo from './ProjectVideo';

const projects = [
  {
    key: 'invitatio',
    title: 'invitatio.ro',
    url: 'https://invitatio.ro',
    video: invitatioVideo,
    poster: invitatioPoster,
    since: '2025',
    ongoing: true,
    tags: ['React', 'TypeScript', 'HeroUI', 'Hono', 'PostgreSQL'],
  },
  {
    key: 'vanillaCleaning',
    title: 'Vanilla Cleaning',
    url: 'https://vanilla-cleaning.ro',
    video: vanillaVideo,
    poster: vanillaPoster,
    since: '2025',
    ongoing: false,
    tags: ['React', 'Tailwind CSS', 'TinaCMS', 'SEO'],
  },
];

type Project = (typeof projects)[number];

const t = (key: string, options?: Record<string, unknown>) =>
  I18n.t(`landingPage:projects.${key}`, options);

const trackProject = (project: Project) => {
  track('project_click', { project_name: project.title, link_url: project.url });
};

const renderItem = (item: string) => (
  <li key={item} className='text-secondary-foreground flex items-start gap-3 text-sm'>
    <span aria-hidden className='text-primary mt-1 font-mono text-xs'>
      ▹
    </span>
    {item}
  </li>
);

const renderTag = (tag: string) => (
  <li
    key={tag}
    className='border-border text-muted-foreground border px-2 py-0.5 font-mono text-xs'>
    {tag}
  </li>
);

const renderProject = (project: Project, i: number) => {
  const built = t(`${project.key}.built`, { returnObjects: true }) as unknown as string[];
  const period = project.ongoing
    ? `${project.since} — ${I18n.t('general:present')}`
    : project.since;

  return (
    <motion.article
      key={project.key}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className='bg-card border-border grid overflow-hidden border lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]'>
      <div className='bg-secondary border-border border-b lg:border-r lg:border-b-0'>
        <ProjectVideo src={project.video} poster={project.poster} title={project.title} />
      </div>

      <div className='flex flex-col gap-5 p-6'>
        <div>
          <h3 className='text-foreground mb-1 text-lg font-semibold'>{project.title}</h3>
          <p className='text-secondary-foreground text-sm leading-relaxed'>
            {t(`${project.key}.summary`)}
          </p>
        </div>

        <dl className='grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs'>
          <dt className='text-muted-foreground'>{t('labels.role')}</dt>
          <dd className='text-foreground'>{t(`${project.key}.role`)}</dd>
          <dt className='text-muted-foreground'>{t('labels.year')}</dt>
          <dd className='text-foreground'>{period}</dd>
        </dl>

        <div>
          <h4 className='text-primary mb-2 font-mono text-xs tracking-wider uppercase'>
            {t('labels.problem')}
          </h4>
          <p className='text-secondary-foreground text-sm leading-relaxed'>
            {t(`${project.key}.problem`)}
          </p>
        </div>

        <div>
          <h4 className='text-primary mb-2 font-mono text-xs tracking-wider uppercase'>
            {t('labels.built')}
          </h4>
          <ul className='space-y-2'>{built.map(renderItem)}</ul>
        </div>

        <div>
          <h4 className='text-primary mb-2 font-mono text-xs tracking-wider uppercase'>
            {t('labels.result')}
          </h4>
          <p className='text-foreground text-sm leading-relaxed'>{t(`${project.key}.result`)}</p>
        </div>

        <ul className='flex flex-wrap gap-2'>{project.tags.map(renderTag)}</ul>

        <a
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
          onClick={trackProject.bind(null, project)}
          className='border-primary text-primary hover:bg-primary hover:text-primary-foreground flex w-fit items-center gap-2 border px-4 py-2 font-mono text-xs transition-colors sm:text-sm'>
          {t('labels.visit')}
          <ArrowUpRight aria-hidden className='size-4' />
          <span className='sr-only'>
            {project.title} ({I18n.t('general:opensInNewTab')})
          </span>
        </a>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id='projects' className='w-full py-20'>
      <div className='container mx-auto max-w-5xl'>
        {/* index shifted 06→05 while Fitness is hidden; restore to 06 when Fitness returns */}
        <SectionHeading index='05' title={I18n.t('general:projects')} />
        <div className='mt-10 space-y-10'>{projects.map(renderProject)}</div>
      </div>
    </section>
  );
};

export default Projects;
