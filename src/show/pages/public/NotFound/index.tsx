const NotFound = () => {
  return (
    <div className='bg-background flex h-[calc(100dvh-64px)] flex-col items-center justify-center gap-4 px-4 text-center'>
      <h1 className='text-6xl font-bold text-gray-800'>404</h1>
      <p className='text-xl text-gray-600'>Page Not Found</p>
      <a href='/' className='text-primary hover:underline'>
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
