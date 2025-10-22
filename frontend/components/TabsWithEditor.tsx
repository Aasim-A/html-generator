'use client';

import { useEffect, useState } from 'react';
import Tabs, { Tab } from '@/components/Tabs';
import HTMLGenerator from './HTMLGenerator';

const defaultTabs = [
  { id: 1, label: 'Tab 1', content: 'This is the content of Tab 1.' },
  { id: 2, label: 'Tab 2', content: 'This is the content of Tab 2.' },
];

let timeoutId = 0;

const TabsWithEditor = () => {
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [editingTab, setEditingTab] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const addTab = () => {
    const newId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    const newTab = { id: newId, label: `New Tab`, content: '' };
    setTabs([...tabs, newTab]);
    setActiveTab(newId);

    // immediately enter edit mode for new tab
    setEditingTab(newId);
    setEditValue(newTab.label);
  };

  const deleteTab = (id: number) => {
    const filtered = tabs.filter(tab => tab.id !== id);
    setTabs(filtered);
    if (activeTab === id && filtered.length > 0) {
      setActiveTab(filtered[0].id);
    }
  };

  const renameTab = (id: number, newLabel: string) => {
    setTabs(prev => prev.map(tab => (tab.id === id ? { ...tab, label: newLabel } : tab)));
  };

  const saveEdit = (id: number) => {
    if (editValue.trim() !== '') {
      renameTab(id, editValue.trim());
    }
    setEditingTab(null);
  };

  const updateContent = (newContent: string) => {
    setTabs(prev =>
      prev.map(tab => (tab.id === activeTab ? { ...tab, content: newContent } : tab)),
    );
  };

  useEffect(() => {
    if (tabs === defaultTabs) return;
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => localStorage.setItem('tabs', JSON.stringify(tabs)), 500);
  }, [tabs]);

  useEffect(() => {
    const storedTabs = localStorage.getItem('tabs');
    if (storedTabs) setTabs(JSON.parse(storedTabs));
  }, []);

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-6'>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addTab={addTab}
          deleteTab={deleteTab}
          editingTab={editingTab}
          setEditingTab={setEditingTab}
          editValue={editValue}
          setEditValue={setEditValue}
          saveEdit={saveEdit}
        />

        <div className='flex-1'>
          {currentTab ? (
            <textarea
              className='h-96 w-full resize-none rounded-lg bg-gray-100 p-3 text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100'
              value={currentTab.content}
              onChange={e => updateContent(e.target.value)}
            />
          ) : (
            <div className='text-gray-500 dark:text-gray-400'>No tab selected.</div>
          )}
        </div>
      </div>

      <HTMLGenerator tabs={tabs} />
    </div>
  );
};

export default TabsWithEditor;
