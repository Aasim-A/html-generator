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
}

const Tabs = ({ tabs, activeTab, setActiveTab, addTab, deleteTab }: TabsProps) => {
  return (
    <div className='flex w-64 flex-col rounded-2xl bg-gray-100 p-4 text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100'>
      {/* Header with title + add button */}
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Tabs</h2>
        <button
          onClick={addTab}
          className='rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-800'
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
            <span>{tab.label}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                deleteTab(tab.id);
              }}
              disabled={tabs.length < 2}
              className='rounded p-1 hover:bg-gray-300 disabled:cursor-not-allowed dark:hover:bg-gray-700'
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
