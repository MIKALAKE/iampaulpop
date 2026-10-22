import { motion } from 'framer-motion';

import I18n from 'Locales';
import { track } from 'Helpers/analytics';
import { SectionHeading } from 'Components';

const projects = [
  {
    title: 'Vanilla Cleaning',
    description: 'landingPage:projects.vanillaCleaning.description',
    url: 'https://vanilla-cleaning.ro',
    order: 1,
    tags: ['SEO', 'Mobile-first', 'Business Site'],
  },
  {
    title: 'invitatio.ro',
    description: 'landingPage:projects.invitatio.description',
    url: 'https://invitatio.ro',
    order: 2,
    tags: ['Wedding Planner', 'Seating Plan'],
  },
];

const trackProject = (project: (typeof projects)[number]) => {
  track('project_click', { project_name: project.title, link_url: project.url });
};

const renderProject = (project: (typeof projects)[number], i: number) => {
  const screenshotUrl = project.url
    ? `https://api.microlink.io?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url`
    : null;

  return (
    <motion.a
      key={i}
      href={project.url}
      target='_blank'
      rel='noopener noreferrer'
      onClick={trackProject.bind(null, project)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className='group bg-card border-border hover:border-primary/30 glow-accent block overflow-hidden rounded-md border transition-all duration-300'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-1 p-6'>
          <div className='mb-3 flex items-start justify-between'>
            <h3 className='text-foreground group-hover:text-primary text-lg font-semibold transition-colors'>
              {project.title}
              <span className='sr-only'> ({I18n.t('general:opensInNewTab')})</span>
            </h3>
          </div>

          <p className='text-secondary-foreground mb-4 text-sm leading-relaxed'>
            {I18n.t(project.description)}
          </p>
          <div className='flex flex-wrap gap-2'>{project.tags.map(renderTag)}</div>
        </div>

        {screenshotUrl && (
          <div className='relative size-46 w-full shrink-0 overflow-hidden md:h-auto md:w-64'>
            <img
              src={screenshotUrl}
              alt=''
              className='absolute inset-0 h-full w-full scale-95 rotate-1 transform object-contain opacity-70 transition-all duration-500 group-hover:scale-100 group-hover:rotate-3 group-hover:opacity-70 md:opacity-0 md:group-hover:rotate-2 md:group-focus-visible:opacity-70'
              loading='lazy'
            />
          </div>
        )}
      </div>
    </motion.a>
  );
};

const renderTag = (tag: string) => (
  <span key={tag} className='text-muted-foreground font-mono text-xs'>
    {tag}
  </span>
);

const Projects = () => {
  return (
    <section id='projects' className='px-6 py-24'>
      <div className='container mx-auto max-w-5xl'>
        {/* index shifted 06→05 while Fitness is hidden; restore to 06 when Fitness returns */}
        <SectionHeading index='05' title={I18n.t('general:projects')} />
        <div className='mt-10 space-y-8'>{projects.map(renderProject)}</div>
      </div>
    </section>
  );
};

export default Projects;
