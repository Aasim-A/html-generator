'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });

export default function Terminal({ correct, setCorrect, correctOutput, level, providedCode }) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [pyodide, setPyodide] = useState(null);

  const initPyodide = async () => {
    try {
      const p = await window.loadPyodide();
      setPyodide(p);
      setLoading(false);
      setOutput('✓ Python environment ready! Click "Run Code" to execute.');
    } catch (e) {
      setOutput('Error loading Pyodide: ' + e.message);
      setLoading(false);
    }
  };

  const runCode = async () => {
    if (!pyodide) return;
    setRunning(true);
    setOutput('Running...');
    try {
      await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
`);
      await pyodide.runPythonAsync(code);
      const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      if (stdout.slice(0, stdout.length - 1) === correctOutput) setCorrect('correct');
      else setCorrect('incorrect');
      setOutput(stdout || 'Code executed successfully (no output)');
    } catch (e) {
      setOutput('Error: ' + e.message);
    } finally {
      setRunning(false);
    }
  };

  const clearOutput = useCallback(() => {
    setOutput('');
    setCorrect('');
  }, [setCorrect]);

  useEffect(() => {
    setCode(providedCode[level - 1]);
    clearOutput();
  }, [level, providedCode, clearOutput]);

  useEffect(() => {
    if ('loadPyodide' in window) initPyodide();
  }, []);

  return (
    <div className='mx-auto max-w-6xl'>
      <Script
        src='https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
        strategy='afterInteractive'
        onLoad={initPyodide}
      />
      <div className='grid gap-6'>
        <div className='overflow-hidden rounded-lg bg-slate-800 shadow-2xl'>
          <div className='flex items-center justify-between bg-slate-700 px-4 py-3'>
            <h2 className='flex items-center gap-2 font-semibold text-white'>
              <span className='ml-2'>main.py</span>
            </h2>
            <button
              onClick={runCode}
              disabled={loading || running}
              className='flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:bg-gray-600'
            >
              {running ? 'Running' : 'Run Code'}
            </button>
          </div>
          <CodeMirror
            value={code}
            height='300px'
            theme={dracula}
            extensions={[python()]}
            onChange={v => setCode(v)}
          />
        </div>

        <div className='overflow-hidden rounded-lg bg-slate-800 shadow-2xl'>
          <div className='flex items-center justify-between bg-slate-700 px-4 py-3'>
            <h2
              className={`font-semibold text-white ${correct === 'correct' ? '!text-green-400' : correct === 'incorrect' && '!text-red-500'}`}
            >
              Output{' '}
              {correct === 'correct' ? '✅ Correct!' : correct === 'incorrect' && '❌ Incorrect!'}
            </h2>
            <button
              onClick={clearOutput}
              className='flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-white transition-colors hover:bg-red-700'
            >
              Clear
            </button>
          </div>
          <div className='h-full overflow-auto bg-slate-900 p-4'>
            {loading ? (
              <div className='flex items-center gap-2 text-purple-400'>
                Loading Python environment...
              </div>
            ) : (
              <pre className='font-mono text-sm whitespace-pre-wrap text-gray-300'>
                {output || 'No output yet. Run your code to see results here.'}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
