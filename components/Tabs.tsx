'use client';

export interface Tab {
  id: number;
  label: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (id: number) => void;
  addTab: () => void;
  deleteTab: (id: number) => void;
  editingTab: number | null;
  setEditingTab: (id: number | null) => void;
  editValue: string;
  setEditValue: (val: string) => void;
  saveEdit: (id: number) => void;
}

// --- Vertical Tabs with Editable Labels ---
const Tabs = ({
  tabs,
  activeTab,
  setActiveTab,
  addTab,
  deleteTab,
  editingTab,
  setEditingTab,
  editValue,
  setEditValue,
  saveEdit,
}: TabsProps) => {
  const startEditing = (tabId: number, currentLabel: string) => {
    setEditingTab(tabId);
    setEditValue(currentLabel);
  };

  return (
    <div className='flex w-64 flex-col rounded-2xl bg-gray-100 p-4 text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100'>
      {/* Header with title + add button */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Tabs</h2>
        <button
          onClick={addTab}
          disabled={tabs.length > 14}
          className='rounded-md p-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 dark:hover:bg-gray-800'
        >
          {/* Plus Icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
        </button>
      </div>
      <span className='mb-2 w-full text-sm text-gray-500 dark:text-gray-400'>
        Double click to edit title
      </span>

      {/* Tab list */}
      <div className='flex flex-col space-y-2'>
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {/* Editable label */}
            {editingTab === tab.id ? (
              <input
                className='mr-2 flex-1 rounded bg-white px-1 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onBlur={() => saveEdit(tab.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter') saveEdit(tab.id);
                  if (e.key === 'Escape') setEditingTab(null);
                }}
                autoFocus
              />
            ) : (
              <span
                className='mr-2 flex-1'
                onDoubleClick={e => {
                  e.stopPropagation();
                  startEditing(tab.id, tab.label);
                }}
              >
                {tab.label}
              </span>
            )}

            {/* Delete button */}
            <button
              onClick={e => {
                e.stopPropagation();
                deleteTab(tab.id);
              }}
              disabled={tabs.length < 2}
              className={`rounded p-1 disabled:cursor-not-allowed disabled:text-gray-400 ${
                activeTab === tab.id
                  ? 'hover:bg-blue-600'
                  : 'hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {/* X Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
