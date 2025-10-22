import { useState, useCallback } from 'react';

export default function Room3() {
  const [revealed, setRevealed] = useState([false, false]);

  const toggleHint = useCallback(
    (index: number) => {
      const newRevealed = [...revealed];
      newRevealed[index] = !newRevealed[index];
      setRevealed(newRevealed);
    },
    [revealed],
  );

  return (
    <div>
      <h2 className='mb-4 text-2xl font-semibold text-gray-100'>Room 3: The Data Vault</h2>
      <div className='space-y-4'>
        <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
          <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>
            Description
          </h3>
          <div>
            You reach a glowing digital vault. Its interface reads:
            <br />
            <br />
            <blockquote className='border-l-4 border-blue-500 pl-4 text-gray-700 italic dark:text-gray-300'>
              “Checksum required: 42.”
            </blockquote>
            <br />A corrupted data array lies on the terminal. Somewhere in it, two numbers multiply
            to make 42.
            <br />
            Find their positions to open the vault.
          </div>
          <br />
          <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>Objective</h3>
          <ol className='list-inside list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300'>
            <li>
              Return a tuple of indices (i, j) such that{' '}
              <code className='rounded bg-slate-700 px-1'>nums[i] * nums[j] == 42</code>.
            </li>
            <li>The vault opens when the right pair is found.</li>
          </ol>
        </div>
      </div>
      <div className='mt-6 mb-4 rounded-lg bg-slate-800 p-4 text-sm text-purple-200'>
        <h3 className='mb-2 font-semibold'>Hints (click to reveal):</h3>
        <ol className='list-inside list-decimal space-y-1'>
          <li onClick={() => toggleHint(0)}>
            <span
              className={`cursor-pointer ${revealed[0] ? '' : 'bg-purple-200 blur-[3px] *:bg-purple-200'}`}
            >
              You need two numbers <code className='rounded bg-slate-700 px-1'>x</code> and{' '}
              <code className='rounded bg-slate-700 px-1'>y</code> from the list so that{' '}
              <code className='rounded bg-slate-700 px-1'>x * y == 42</code>.
            </span>
          </li>
          <li onClick={() => toggleHint(1)}>
            <span
              className={`cursor-pointer ${revealed[1] ? '' : 'bg-purple-200 blur-[3px] *:bg-purple-200'}`}
            >
              You can check every possible pair using a nested loop. <br />
              For each <code className='rounded bg-slate-700 px-1'>i</code>, compare it with every
              number after it (<code className='rounded bg-slate-700 px-1'>{'j > i'}</code>).
            </span>
          </li>
          <li onClick={() => toggleHint(2)}>
            <span
              className={`cursor-pointer ${revealed[2] ? '' : 'bg-purple-200 *:bg-purple-200 [*]:blur-[3px]'}`}
            >
              Try something like:
              <br />
              <code className='rounded bg-slate-700 px-1 whitespace-pre'>{`for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        if nums[i] * nums[j] == 42:
            return (i, j)
`}</code>
              This will give you the indices that unlock the vault.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
