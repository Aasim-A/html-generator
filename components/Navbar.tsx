'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      window.dispatchEvent(new CustomEvent<string>('themeChange', { detail: 'dark' }));
    } else {
      document.documentElement.classList.remove('dark');
      window.dispatchEvent(new CustomEvent<string>('themeChange', { detail: 'light' }));
    }
  }, [isDarkMode]);

  return (
    <div className='w-full bg-gray-100 text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100'>
      <nav className='relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        <div className='flex space-x-6'>
          <Link href='/' className='hover:text-blue-500'>
            Home
          </Link>
          <Link href='/about' className='hover:text-blue-500'>
            About
          </Link>
          <Link href='#' className='hover:text-blue-500'>
            Pre-lab Questions
          </Link>
          <Link href='#' className='hover:text-blue-500'>
            Escape Room
          </Link>
          <Link href='#' className='hover:text-blue-500'>
            Coding Races
          </Link>
        </div>

        <div className='flex space-x-4'>
          <button
            className='cursor-pointer rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-900'
            onClick={() => setIsDarkMode(prev => !prev)}
          >
            <Image
              src={isDarkMode ? '/sun.png' : '/moon.png'}
              width={32}
              height={32}
              alt='Theme status icon'
            />
          </button>
          <button
            className='fillwhite cursor-pointer rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-900'
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <Image src='/menu-icon.png' width={32} height={32} alt='Menu icon' />
          </button>
        </div>
        {isMenuOpen && (
          <div className='absolute top-20 right-0 float-right rounded-xl bg-gray-200 text-center text-gray-900 shadow-inner dark:bg-gray-900 dark:text-gray-100'>
            <div className='mx-auto flex max-w-6xl flex-col space-y-4 py-4'>
              <Link href='/' className='w-full px-6 hover:text-blue-500'>
                Home
              </Link>
              <Link href='/about' className='w-full px-6 hover:text-blue-500'>
                About
              </Link>
              <Link href='#' className='w-full px-6 hover:text-blue-500'>
                Pre-lab Questions
              </Link>
              <Link href='#' className='w-full px-6 hover:text-blue-500'>
                Escape Room
              </Link>
              <Link href='#' className='w-full px-6 hover:text-blue-500'>
                Coding Races
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
