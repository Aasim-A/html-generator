import { useState, useCallback } from 'react';

export default function Room2() {
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
      <h2 className='mb-4 text-2xl font-semibold text-gray-100'>Room 2: The Broken Keypad</h2>
      <div className='space-y-4'>
        <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
          <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>
            Description
          </h3>
          <div>
            A door glows with a red keypad.
            <br />
            <br />
            A note beside it reads:
            <br />
            <br />
            <blockquote className='border-l-4 border-blue-500 pl-4 text-gray-700 italic dark:text-gray-300'>
              “The 3 digits that open this door are from 1–9. <br />
              Their sum is 9. <br />
              They increase from left to right.”
            </blockquote>
            <br />
            <br />
            Find the possible codes that fit these rules.
          </div>
          <br />
          <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>Objective</h3>
          <ol className='list-inside list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300'>
            <li>Print every valid code combination.</li>
            <li>The correct code is one of them — enter it to unlock the next room.</li>
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
              You’re looping through digits <code className='rounded bg-slate-700 px-1'>a</code>,{' '}
              <code className='rounded bg-slate-700 px-1'>b</code>, and{' '}
              <code className='rounded bg-slate-700 px-1'>c</code>. <br />
              They’re already in ascending order — so you just need to check the total.
            </span>
          </li>
          <li onClick={() => toggleHint(1)}>
            <span
              className={`cursor-pointer ${revealed[1] ? '' : 'bg-purple-200 blur-[3px] *:bg-purple-200'}`}
            >
              Each number must be less than the next one, and their total should equal 9.
            </span>
          </li>
          <li onClick={() => toggleHint(2)}>
            <span
              className={`cursor-pointer ${revealed[2] ? '' : 'bg-purple-200 *:bg-purple-200 [*]:blur-[3px]'}`}
            >
              Add a condition inside your loop:
              <br />
              <code className='rounded bg-slate-700 px-1 whitespace-pre'>{`if a + b + c == 9:
    print(a, b, c)
`}</code>
              That’s it — the valid codes will appear on screen.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
