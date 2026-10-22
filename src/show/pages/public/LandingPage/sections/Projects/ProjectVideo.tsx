import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

import I18n from 'Locales';
import { track } from 'Helpers/analytics';

interface ProjectVideoProps {
  src: string;
  poster: string;
  title: string;
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Muted, looping presentation video. It only downloads and plays while it is on
 * screen, never autoplays for people who asked for reduced motion, and can be
 * paused (anything that moves for more than 5s needs a pause control).
 */
const ProjectVideo = ({ src, poster, title }: ProjectVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView && !paused) video.play().catch(() => {});
    else video.pause();
  }, [inView, paused]);

  const toggle = () => {
    track('project_video', { project_name: title, action: paused ? 'play' : 'pause' });
    setPaused(current => !current);
  };

  return (
    <div className='relative h-full w-full'>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload='none'
        aria-label={I18n.t('landingPage:projects.videoLabel', { name: title })}
        className='aspect-[9/16] h-full w-full object-cover lg:aspect-auto'
      />

      <button
        type='button'
        onClick={toggle}
        aria-label={I18n.t(paused ? 'landingPage:projects.play' : 'landingPage:projects.pause')}
        className='bg-background/80 text-foreground hover:bg-background absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full shadow backdrop-blur-sm transition-colors'>
        {paused ? (
          <Play aria-hidden className='size-4' />
        ) : (
          <Pause aria-hidden className='size-4' />
        )}
      </button>
    </div>
  );
};

export default ProjectVideo;
