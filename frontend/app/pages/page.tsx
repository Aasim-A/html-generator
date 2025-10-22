'use client';

import { useEffect, useState } from 'react';

interface Page {
  id: number;
  title: string;
  html: string;
  createdAt: string;
  updatedAt: string;
}

export default function Pages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editHtml, setEditHtml] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all pages on mount
  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`);
    const data = await res.json();
    setPages(data);
  }

  function startEditing(page: Page) {
    setEditingId(page.id);
    setEditTitle(page.title);
    setEditHtml(page.html);
  }

  async function saveEdit(id: number) {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, html: editHtml }),
    });
    setEditingId(null);
    await fetchPages();
    setLoading(false);
  }

  async function deletePage(id: number) {
    if (!confirm('Delete this page?')) return;
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${id}`, { method: 'DELETE' });
    await fetchPages();
    setLoading(false);
  }

  return (
    <div className='p-6'>
      <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100'>📄 Stored Pages</h1>

      {pages.length === 0 ? (
        <p className='text-gray-600 dark:text-gray-400'>No pages found.</p>
      ) : (
        <div className='grid gap-4 lg:grid-cols-2'>
          {pages.map(page => (
            <div
              key={page.id}
              className='flex w-full flex-col rounded-2xl bg-gray-100 p-4 text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100'
            >
              <div className='flex items-center justify-between'>
                {editingId === page.id ? (
                  <input
                    className='w-full rounded-md border border-gray-300 bg-white p-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                ) : (
                  <h2
                    className='cursor-pointer text-lg font-semibold hover:underline'
                    onDoubleClick={() => startEditing(page)}
                  >
                    {page.title}
                  </h2>
                )}
                <div className='flex items-center gap-2 text-2xl'>
                  {editingId === page.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(page.id)}
                        disabled={loading}
                        className='rounded-md p-1 hover:bg-gray-200 disabled:opacity-50 dark:hover:bg-gray-800'
                        title='Save'
                      >
                        💾
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className='rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-800'
                        title='Cancel'
                      >
                        ✖
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => deletePage(page.id)}
                      disabled={loading}
                      className='rounded-md p-1 text-red-600 hover:bg-gray-200 dark:text-red-400 dark:hover:bg-gray-800'
                      title='Delete'
                    >
                      ❌
                    </button>
                  )}
                </div>
              </div>

              <span className='mb-2 w-full text-sm text-gray-500 dark:text-gray-400'>
                Double click title to edit
              </span>

              {editingId === page.id ? (
                <textarea
                  className='h-96 w-full rounded-md border border-gray-300 bg-white p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'
                  value={editHtml}
                  onChange={e => setEditHtml(e.target.value)}
                />
              ) : (
                <iframe srcDoc={page.html} title='Preview' className='h-96 bg-white' />
              )}

              <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
                Last updated: {new Date(page.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
