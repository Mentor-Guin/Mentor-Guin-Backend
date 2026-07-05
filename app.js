require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const openApiSpec = require('./src/docs/openapi');
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
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
