const express = require('express');
const { assignments } = require('../data/seedLessons');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(assignments);
});

module.exports = router;
