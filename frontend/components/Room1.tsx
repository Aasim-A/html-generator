import { useState, useCallback } from 'react';

export default function Room1() {
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
      <h2 className='mb-4 text-2xl font-semibold text-gray-100'>Room 1: The Locked Terminal</h2>
      <div className='space-y-4'>
        <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
          <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>
            Description
          </h3>
          <div>
            You wake up in a flickering digital chamber. A message scrolls across the screen:
            <br />
            <br />
            <blockquote className='border-l-4 border-blue-500 pl-4 text-gray-700 italic dark:text-gray-300'>
              “Access denied. Only those who know the prime code may proceed.”
            </blockquote>
            <br />
            Hidden within a string of letters lies the password — it’s formed from the characters at
            prime-numbered positions (2, 3, 5, 7, 11, …).
            <br />
            <br />
            Can you extract it and reveal the key?
          </div>
          <br />
          <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>Objective</h3>
          <ol className='list-inside list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300'>
            <li>Complete the function so that it returns the correct hidden password.</li>
            <li>When printed, it should reveal the key to the next room.</li>
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
              Prime numbers are special — they can only be divided by 1 and themselves. <br />
              Which positions in the string would that include?
            </span>
          </li>
          <li onClick={() => toggleHint(1)}>
            <span
              className={`cursor-pointer ${revealed[1] ? '' : 'bg-purple-200 blur-[3px] *:bg-purple-200'}`}
            >
              Remember that Python starts counting from 0.
              <br /> That means the first character has index 0, the second index 1, and so on.
              <br /> So the prime indices would start from 2, 3, 5, 7, 11, …
            </span>
          </li>
          <li onClick={() => toggleHint(2)}>
            <span
              className={`cursor-pointer ${revealed[2] ? '' : 'bg-purple-200 *:bg-purple-200 [*]:blur-[3px]'}`}
            >
              Try looping over the string with:
              <br />
              <code className='rounded bg-slate-700 px-1 whitespace-pre'>{`for i in range(len(s)):
    if is_prime(i):
        result += s[i]
`}</code>
              You’ll need to define an
              <code className='rounded bg-slate-700 px-1'>is_prime(n)</code> function that returns{' '}
              <code className='rounded bg-slate-700 px-1'>True</code> for primes.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
