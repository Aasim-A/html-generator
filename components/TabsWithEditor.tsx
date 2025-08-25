'use client';

import { useState } from 'react';
import Tabs, { Tab } from '@/components/Tabs';

const TabsWithEditor = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, label: 'Tab 1', content: 'This is the content of Tab 1.' },
    { id: 2, label: 'Tab 2', content: 'This is the content of Tab 2.' },
  ]);
  const [activeTab, setActiveTab] = useState<number>(1);

  const addTab = () => {
    const newId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    const newTab = { id: newId, label: `Tab ${newId}`, content: '' };
    setTabs([...tabs, newTab]);
    setActiveTab(newId);
  };

  const deleteTab = (id: number) => {
    const filtered = tabs.filter(tab => tab.id !== id);
    setTabs(filtered);
    if (activeTab === id && filtered.length > 0) {
      setActiveTab(filtered[0].id);
    }
  };

  const updateContent = (newContent: string) => {
    setTabs(prev =>
      prev.map(tab => (tab.id === activeTab ? { ...tab, content: newContent } : tab)),
    );
  };

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className='flex gap-6'>
      {/* Left: Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        addTab={addTab}
        deleteTab={deleteTab}
      />

      {/* Right: Textarea Editor */}
      <div className='flex-1'>
        {currentTab ? (
          <textarea
            className='h-96 w-full resize-none rounded-lg border bg-gray-50 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
            value={currentTab.content}
            onChange={e => updateContent(e.target.value)}
          />
        ) : (
          <div className='text-gray-500 dark:text-gray-400'>No tab selected.</div>
        )}
      </div>
    </div>
  );
};

export default TabsWithEditor;
