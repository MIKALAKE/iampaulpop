import { motion } from 'framer-motion';

import I18n from 'Locales';
import { Avatar, AvatarFallback, AvatarImage } from 'Components/Avatar';
import { Card, CardContent, CardHeader, CardTitle } from 'Components/ui/card';

const renderStat = (stat: { value: string; label: string }, index: number) => (
  <div key={index} className='text-center'>
    <div className='text-foreground font-mono text-2xl font-bold'>{stat.value}</div>
    <div className='text-muted-foreground text-sm'>{stat.label}</div>
  </div>
);

const AthleteStats = ({ athlete }: { athlete: any }) => {
  if (!athlete) return null;

  const stats = [
    {
      label: I18n.t('landingPage:fitness.stats.followers'),
      value: athlete.follower_count?.toLocaleString() || '—',
    },
    {
      label: I18n.t('landingPage:fitness.stats.following'),
      value: athlete.friend_count?.toLocaleString() || '—',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='mb-8'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-3'>
            <Avatar size='lg'>
              <AvatarImage src={athlete.profile} alt='Athlete profile picture' />
              <AvatarFallback>
                {athlete.firstname?.[0]}
                {athlete.lastname?.[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className='text-foreground text-lg font-semibold'>
                {athlete.firstname} {athlete.lastname}
              </h3>
              <p className='text-muted-foreground text-sm'>
                {athlete.city && athlete.country ? `${athlete.city}, ${athlete.country}` : 'N/A'}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4'>{stats.map(renderStat)}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AthleteStats;
