'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        </div>

        <button
          className='rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800'
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <Image src='/menu-icon.png' width={24} height={24} alt='Menu icon' />
        </button>
        {isMenuOpen && (
          <div className='absolute top-20 right-0 float-right rounded-xl bg-gray-200 text-center text-gray-900 shadow-inner dark:bg-gray-800 dark:text-gray-100'>
            <div className='mx-auto flex max-w-6xl flex-col space-y-4 py-4'>
              <Link href='/' className='w-full px-6 hover:text-blue-500'>
                Home
              </Link>
              <Link href='/about' className='w-full px-6 hover:text-blue-500'>
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
