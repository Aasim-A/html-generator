import { FC } from 'react';

const Header: FC = () => {
  return (
    <div className='flex w-full bg-gray-100 py-4 text-center text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <span className='flex-1 text-2xl'>HTML Generator</span>
      <span className='px-12 text-2xl'>21987364</span>
    </div>
  );
};

export default Header;
