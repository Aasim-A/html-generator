'use client';

import { useState, useCallback, useEffect, SetStateAction, Dispatch } from 'react';
import Link from 'next/link';
import Terminal from '@/components/Terminal';
import Room1 from '@/components/Room1';
import Room2 from '@/components/Room2';
import Room3 from '@/components/Room3';
import Congrats from '@/components/Congrats';
import Failure from '@/components/Failure';

const providedCode = [
  `def extract_prime_letters(s):
    # TODO: Return a new string made of characters
    # whose indices are prime numbers (2, 3, 5, 7, ...)
    # Example: "escapeRoom" -> "capeo"
    pass

# Test input
text = "eScApErOoM"
print(extract_prime_letters(text))
  `,
  `# TODO: Print all 3-digit codes (using digits 1–9)
# where digits are in ascending order
# and their sum equals 9.

for a in range(1, 10):
    for b in range(a+1, 10):
        for c in range(b+1, 10):
            # Your condition goes here
            pass
`,

  `def find_pair(nums, target=42):
    # TODO: Find two numbers that multiply to target (42)
    # and return their indices as a tuple (i, j)
    # Example input: [3, 6, 9, 14, 21, 2]
    pass

# Test input
nums = [3, 6, 9, 14, 21, 2]
print(find_pair(nums))
`,
];

const correctOutputs = [
  'cAEO',
  `126
135
234`,
  '(0, 3)',
];

// ───────── TIMER ─────────
const CountdownTimer = ({
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

// ───────── PAGE ─────────
const EscapePage = () => {
  const [level, setLevel] = useState(0);
  const [correct, setCorrect] = useState<string>('');

  const incrementLevel = useCallback(() => {
    setLevel(c => c + 1);
    setCorrect('');
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 flex items-center justify-between gap-4'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100'>Escape Room</h1>
          {level > 0 && level < 4 && (
            <CountdownTimer initialSeconds={45 * 60} setLevel={setLevel} />
          )}
        </div>

        <div
          style={{
            backgroundImage: 'url("/escape-room.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          className='rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900'
        >
          {level === 0 && (
            <>
              <div>
                <h2 className='mb-4 text-2xl font-semibold text-gray-100'>Coding Challenges</h2>
                <div className='space-y-4'>
                  <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
                    <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>
                      Overview
                    </h3>
                    <ol className='list-inside list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300'>
                      <li>There will be 3 challenges for you to finish in order to escape.</li>
                      <li>Read the instructions and code your way out of the room.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </>
          )}
          {level === 1 && <Room1 />}
          {level === 2 && <Room2 />}
          {level === 3 && <Room3 />}
          {level === 4 && <Congrats />}
          {level === 5 && <Failure />}

          {level > 0 && level < 4 && (
            <Terminal
              correct={correct}
              setCorrectAction={setCorrect}
              correctOutput={correctOutputs[level - 1]}
              level={level}
              providedCode={providedCode}
            />
          )}

          <div className='mt-8 flex flex-col items-center border-t border-gray-200 pt-8 dark:border-gray-700'>
            <button
              hidden={level > 0}
              onClick={incrementLevel}
              className='cursor-pointer rounded-lg bg-blue-500 p-3 px-5'
            >
              Start
            </button>
            {correct === 'correct' && (
              <div
                style={{ WebkitTextStroke: '1px oklch(62.3% 0.214 259.815)' }}
                className='mb-4 font-extrabold text-white'
              >
                You can proceed to the next room!
              </div>
            )}
            <button
              hidden={level === 0 || level > 3}
              onClick={incrementLevel}
              disabled={correct !== 'correct'}
              className='cursor-pointer rounded-lg bg-blue-500 p-3 px-5 disabled:cursor-not-allowed disabled:bg-gray-400'
            >
              Next
            </button>

            <button hidden={level < 4} className='cursor-pointer rounded-lg bg-blue-500 p-3 px-5'>
              <Link href='/'>Go Home</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscapePage;
