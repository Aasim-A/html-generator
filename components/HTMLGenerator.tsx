'use client';

import { FC, useEffect, useState } from 'react';
import { Tab } from './Tabs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface HTMLGeneratorProps {
  tabs: Tab[];
}

const HTMLGenerator: FC<HTMLGeneratorProps> = ({ tabs }) => {
  const [output, setOutput] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const listener = (e: Event) => {
      setIsDark((e as CustomEvent<string>).detail === 'dark');
    };

    window.addEventListener('themeChange', listener);

    return () => {
      window.removeEventListener('themeChange', listener);
    };
  });

  const generateHtml = () => {
    const buttons = tabs
      .map(
        (tab, idx) =>
          `<button class="tablinks" onclick="openTab(event, 'tab${tab.id}')">${idx + 1}. ${tab.label}</button>`,
      )
      .join('\n');

    const contents = tabs
      .map(
        (tab, idx) => `
<div id="tab${tab.id}" class="tabcontent" style="display:${idx === 0 ? 'block' : 'none'}; padding: 6px 12px; border: 1px solid #ccc; border-top: none;">
  <h3>${tab.label}</h3>
  <p>${tab.content.replace(/\n/g, '<br/>')}</p>
</div>`,
      )
      .join('\n\n');

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}
.tab button:hover {
  background-color: #ddd;
}
.tab button.active {
  background-color: #ccc;
}
.tabcontent {
  display: none;
}
</style>
</head>
<body>

<div class="tab">
${buttons}
</div>

${contents}

<script>
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
</script>

</body>
</html>`;

    setOutput(html);
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      alert('HTML copied to clipboard!');
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([output], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tabs.html';
    link.click();
  };

  return (
    <div className='mt-6 space-y-4'>
      <button
        onClick={generateHtml}
        className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
      >
        Generate HTML
      </button>

      {output && (
        <div className='space-y-3'>
          <SyntaxHighlighter
            language='html'
            style={isDark ? oneDark : oneLight}
            wrapLongLines
            showLineNumbers
            className='h-96 w-full rounded-lg bg-gray-100 p-3 font-mono shadow-md dark:bg-gray-900'
          >
            {output}
          </SyntaxHighlighter>
          <div className='flex space-x-3'>
            <button
              onClick={copyToClipboard}
              className='rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700'
            >
              Copy
            </button>
            <button
              onClick={downloadHtml}
              className='rounded-lg bg-purple-600 px-3 py-2 text-white hover:bg-purple-700'
            >
              Download HTML
            </button>
          </div>

          <div className='mt-6 overflow-hidden rounded-lg shadow-md'>
            <h3 className='bg-gray-100 px-3 py-2 font-semibold text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
              Preview
            </h3>
            <iframe srcDoc={output} title='Preview' className='h-96 w-full bg-white' />
          </div>
        </div>
      )}
    </div>
  );
};

export default HTMLGenerator;
