import { FC } from 'react';

const Footer: FC = () => {
  return (
    <div className='w-full bg-gray-100 py-20 text-center text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100'>
      Copyright {new Date().getFullYear()} Aasim Al-Mashhadani | 21987364
    </div>
  );
};

export default Footer;
