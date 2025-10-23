'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';

const Timer = ({
  initialSeconds,
  setLevel,
}: {
  initialSeconds: number;
  setLevel: Dispatch<SetStateAction<number>>;
}) => {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (remaining <= 0) setLevel(5);
    const id = setInterval(() => {
      setRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [remaining, setLevel]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <span
      aria-live='polite'
      className='inline-flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm dark:border-gray-700 dark:text-gray-100'
    >
      ⏳ {minutes}:{seconds.toString().padStart(2, '0')}
    </span>
  );
};

export default Timer;
