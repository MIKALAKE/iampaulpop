import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

import I18n from 'Locales';
import { Badge } from 'Components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from 'Components/ui/card';

const formatDistance = (distance: number): string => {
  const km = (distance / 1000).toFixed(1);
  return `${km} km`;
};

const formatTime = (seconds: number): string => {
  const duration = dayjs.duration(seconds, 'seconds');
  const secondsPart = duration.seconds().toString().padStart(2, '0');
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (hours > 0) {
    return `${hours}:${minutes}:${secondsPart}`;
  }
  return `${minutes}:${secondsPart}`;
};

const formatElevation = (elevation: number): string => {
  return `${Math.round(elevation)} m`;
};

const formatPace = (distance: number, time: number): string => {
  if (!distance || !time) return '—';
  const paceSeconds = time / (distance / 1000);
  const paceDuration = dayjs.duration(paceSeconds, 'seconds');
  const minutes = paceDuration.minutes();
  const seconds = paceDuration.seconds();
  return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
};

const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('MMM D');
};

const getActivityIcon = (type: string): string => {
  const icons: Record<string, string> = {
    Run: '🏃',
    Ride: '🚴',
    Swim: '🏊',
    Hike: '🥾',
    Walk: '🚶',
    Workout: '💪',
    Yoga: '🧘',
  };
  return icons[type] || '🏃';
};

const ActivityCard = ({ activity, index }: { activity: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}>
    <Card className='hover:border-primary/50 h-full transition-colors duration-200'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <div className='line-clamp-3 flex items-start gap-2'>
            <span className='shrink-0 text-lg'>{getActivityIcon(activity.type)}</span>
            <span className='text-foreground line-clamp-3 min-w-0 text-base font-semibold'>
              {activity.name}
            </span>
          </div>

          <Badge variant='outline' className='text-xs'>
            {formatDate(activity.start_date)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='grid grid-cols-2 gap-3 text-sm'>
          <div className='space-y-1'>
            <div className='text-muted-foreground'>
              {I18n.t('landingPage:fitness.stats.distance')}
            </div>
            <div className='text-foreground font-mono font-semibold'>
              {formatDistance(activity.distance)}
            </div>
          </div>
          <div className='space-y-1'>
            <div className='text-muted-foreground'>{I18n.t('landingPage:fitness.stats.time')}</div>
            <div className='text-foreground font-mono font-semibold'>
              {formatTime(activity.moving_time)}
            </div>
          </div>
          <div className='space-y-1'>
            <div className='text-muted-foreground'>
              {I18n.t('landingPage:fitness.stats.elevation')}
            </div>
            <div className='text-foreground font-mono font-semibold'>
              {formatElevation(activity.total_elevation_gain || 0)}
            </div>
          </div>
          <div className='space-y-1'>
            <div className='text-muted-foreground'>{I18n.t('landingPage:fitness.stats.pace')}</div>
            <div className='text-foreground font-mono font-semibold'>
              {formatPace(activity.distance, activity.moving_time)}
            </div>
          </div>
        </div>
        {activity.achievement_count > 0 && (
          <div className='border-border border-t pt-2'>
            <Badge variant='secondary' className='text-xs'>
              🏆 {activity.achievement_count} achievement
              {activity.achievement_count !== 1 ? 's' : ''}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default ActivityCard;
