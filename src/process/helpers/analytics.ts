declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Sends a GA4 event through the gtag snippet in index.html. Every event carries
 * the language the visitor is reading in, so any report can be split by it.
 * Params only show up in GA reports once they are registered as custom
 * dimensions (Admin → Custom definitions).
 */
export const track = (event: string, params: EventParams = {}) => {
  window.gtag?.('event', event, {
    site_language: document.documentElement.lang,
    ...params,
  });
};

const SCROLL_MILESTONES = [25, 50, 75, 100];

/**
 * GA's built-in scroll event only fires at 90%. These milestones show where
 * people actually stop reading.
 */
export const trackScrollDepth = () => {
  const reached = new Set<number>();

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;

    const percent = (window.scrollY / max) * 100;

    SCROLL_MILESTONES.forEach(milestone => {
      if (percent >= milestone - 1 && !reached.has(milestone)) {
        reached.add(milestone);
        track('scroll_depth', { percent: milestone });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  return () => window.removeEventListener('scroll', onScroll);
};

// Module level, so the remount on a language switch doesn't count sections twice.
const seenSections = new Set<string>();

/**
 * Fires section_view the first time a section crosses the middle of the screen,
 * and section_time with the seconds spent on it each time the reader moves on.
 */
export const trackSections = (ids: string[]) => {
  const visible = new Set<string>();
  const enteredAt = new Map<string, number>();

  const enter = (id: string) => enteredAt.set(id, Date.now());

  const leave = (id: string) => {
    const start = enteredAt.get(id);
    if (start === undefined) return;

    enteredAt.delete(id);
    const seconds = Math.round((Date.now() - start) / 1000);

    // Under 2s is someone scrolling past, not reading.
    if (seconds >= 2) track('section_time', { section: id, seconds });
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(({ isIntersecting, target }) => {
        const { id } = target;

        if (!isIntersecting) {
          visible.delete(id);
          leave(id);
          return;
        }

        visible.add(id);
        enter(id);

        if (!seenSections.has(id)) {
          seenSections.add(id);
          track('section_view', { section: id });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );

  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });

  // A hidden tab isn't being read: close the timer, and restart it on return.
  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') visible.forEach(leave);
    else visible.forEach(enter);
  };

  document.addEventListener('visibilitychange', onVisibilityChange);

  return () => {
    visible.forEach(leave);
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
};
