import { AboutMe, Experience, Hero, Projects, Skills } from './sections';

const LandingPage = () => {
  return (
    <div className='mx-auto flex h-full w-full flex-col items-center justify-center gap-44 px-7 lg:max-w-5xl lg:px-5'>
      <Hero />

      <AboutMe />

      <Experience />

      <Skills />

      <Projects />
    </div>
  );
};

export default LandingPage;
