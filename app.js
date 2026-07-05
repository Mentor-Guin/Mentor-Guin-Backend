require('dotenv').config();

const express = require('express');
const cors = require('cors');
const openApiSpec = require('./src/docs/openapi');
const swaggerPage = require('./src/docs/swaggerPage');
const apiRoutes = require('./src/routes');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.send('MentorGuin Backend is running');
});

app.get('/api/docs.json', (_req, res) => {
  res.json(openApiSpec);
});
app.get(['/api/docs', '/api/docs/'], (_req, res) => {
  res.type('html').send(swaggerPage());
});
app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
