# 📘 Pages API Documentation

This API allows you to create, read, update, and delete stored HTML pages.

## GET /api/pages

Returns a list of all pages.

```javascript
fetch('/api/pages').then(r => r.json())
```

## POST /api/pages

Create a new page with `title` and `html`.

```javascript
fetch('/api/pages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Example', html: '<p>Hello world!</p>' })
})
```

## GET /api/pages/[id]

Retrieve a single page by its ID.

```javascript
fetch('/api/pages/1').then(r => r.json())
```

## PUT /api/pages/[id]

Update an existing page.

```javascript
fetch('/api/pages/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated', html: '<p>Updated HTML</p>' })
})
```

## DELETE /api/pages/[id]

Delete a page by ID.

```javascript
fetch('/api/pages/1', { method: 'DELETE' })
```
