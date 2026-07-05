const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../app');

test('GET /api/health returns ok', async () => {
  const response = await request(app).get('/api/health');
  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('GET /api/docs.json returns OpenAPI spec', async () => {
  const response = await request(app).get('/api/docs.json');
  assert.equal(response.status, 200);
  assert.equal(response.body.openapi, '3.0.3');
  assert.ok(response.body.paths['/health']);
});

test('GET /api/docs returns Swagger UI page', async () => {
  const response = await request(app).get('/api/docs');
  assert.equal(response.status, 200);
  assert.match(response.text, /SwaggerUIBundle/);
  assert.match(response.text, /\/api\/docs\.json/);
});

test('GET /api/lessons returns seeded YouTube lessons', async () => {
  const response = await request(app).get('/api/lessons');
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.lessons));
  assert.ok(response.body.lessons.length >= 4);
  assert.ok(response.body.lessons[0].youtube_video_id);
});

test('POST /api/lessons/:id/quiz/generate returns quiz', async () => {
  const response = await request(app).post('/api/lessons/figma-basics/quiz/generate');
  assert.equal(response.status, 200);
  assert.equal(response.body.lesson_id, 'figma-basics');
  assert.ok(Array.isArray(response.body.questions));
});

test('POST /api/lessons/:id/notes/generate returns note', async () => {
  const response = await request(app).post('/api/lessons/figma-basics/notes/generate');
  assert.equal(response.status, 200);
  assert.equal(response.body.lesson_id, 'figma-basics');
  assert.ok(response.body.summary);
});
