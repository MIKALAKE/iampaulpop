import { motion } from 'framer-motion';

import I18n from 'Locales';
import { useAthlete } from 'Hooks/useAthlete';
import { useActivities } from 'Hooks/useActivity';
import { ActivityCard, AthleteStats, SectionHeading } from 'Components';

const renderActivity = (activity: any, index: number) => (
  <ActivityCard key={activity.id} activity={activity} index={index} />
);

const Fitness = () => {
  const { athlete, loading: athleteLoading, error: athleteError } = useAthlete();
  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useActivities({ per_page: 6 });

  const showLoading = athleteLoading || activitiesLoading;
  const showError = athleteError || activitiesError;

  return (
    <section id='fitness' className='w-full'>
      <div className='container mx-auto max-w-5xl'>
        <SectionHeading index='02' title={I18n.t('general:fitness')} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mt-10'>
          <p className='text-muted-foreground mb-8 leading-relaxed'>
            {I18n.t('landingPage:fitness.description')}
          </p>

          {showError && (
            <div className='py-8 text-center'>
              <p className='text-muted-foreground'>
                {I18n.t('landingPage:fitness.stats.errorLoading')}
              </p>
            </div>
          )}

          {showLoading && (
            <div className='py-8 text-center'>
              <p className='text-muted-foreground'>
                {I18n.t('landingPage:fitness.stats.loadingActivities')}
              </p>
            </div>
          )}

          {!showLoading && !showError && (
            <>
              <AthleteStats athlete={athlete} />

              <div className='mb-6'>
                <h3 className='text-foreground mb-4 flex items-center gap-2 text-xl font-bold'>
                  <span className='text-primary font-mono text-sm'>▹</span>
                  {I18n.t('landingPage:fitness.stats.recentActivities')}
                </h3>
              </div>

              {activities && activities.length > 0 ? (
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {activities.map(renderActivity)}
                </div>
              ) : (
                <div className='py-8 text-center'>
                  <p className='text-muted-foreground'>
                    {I18n.t('landingPage:fitness.stats.noActivities')}
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Fitness;
