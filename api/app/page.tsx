export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">📘 Pages API Documentation</h1>
      <p className="text-gray-600 mb-8">
        This API allows you to create, read, update, and delete stored HTML
        pages.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold">GET /api/pages</h2>
          <p>Returns a list of all pages.</p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
            {`fetch('/api/pages').then(r => r.json())`}
          </pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold">POST /api/pages</h2>
          <p>
            Create a new page with <code>title</code> and <code>html</code>.
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
            {`fetch('/api/pages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Example', html: '<p>Hello world!</p>' })
})`}
          </pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold">GET /api/pages/[id]</h2>
          <p>Retrieve a single page by its ID.</p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
            {`fetch('/api/pages/1').then(r => r.json())`}
          </pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold">PUT /api/pages/[id]</h2>
          <p>Update an existing page.</p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
            {`fetch('/api/pages/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated', html: '<p>Updated HTML</p>' })
})`}
          </pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold">DELETE /api/pages/[id]</h2>
          <p>Delete a page by ID.</p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-2 overflow-x-auto">
            {`fetch('/api/pages/1', { method: 'DELETE' })`}
          </pre>
        </section>
      </div>
    </div>
  );
}
