const express = require('express');
const { homeSummary } = require('../data/seedLessons');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(homeSummary);
});

module.exports = router;
