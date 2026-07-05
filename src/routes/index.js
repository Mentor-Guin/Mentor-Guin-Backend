const express = require('express');
const homeRoutes = require('./home');
const assignmentRoutes = require('./assignments');
const lessonRoutes = require('./lessons');
const { getModuleProgress } = require('../services/lessonService');
const { getAiMode } = require('../services/aiService');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'MentorGuin Backend',
    ai_mode: getAiMode(),
  });
});

router.get('/modules/current', (_req, res) => {
  res.json(getModuleProgress());
});

router.use('/home', homeRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/lessons', lessonRoutes);

module.exports = router;
