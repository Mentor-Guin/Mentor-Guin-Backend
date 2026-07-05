const express = require('express');
const {
  listLessons,
  getLessonById,
  getLessonRecord,
} = require('../services/lessonService');
const { generateQuiz, generateNote } = require('../services/aiService');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ lessons: listLessons() });
});

router.get('/:lessonId', (req, res, next) => {
  const lesson = getLessonById(req.params.lessonId);
  if (!lesson) {
    return next(createNotFoundError('Lesson not found'));
  }
  return res.json(lesson);
});

router.post('/:lessonId/quiz/generate', async (req, res, next) => {
  try {
    const lesson = getLessonRecord(req.params.lessonId);
    if (!lesson) {
      return next(createNotFoundError('Lesson not found'));
    }

    const quiz = await generateQuiz(lesson);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
});

router.post('/:lessonId/notes/generate', async (req, res, next) => {
  try {
    const lesson = getLessonRecord(req.params.lessonId);
    if (!lesson) {
      return next(createNotFoundError('Lesson not found'));
    }

    const note = await generateNote(lesson);
    res.json(note);
  } catch (error) {
    next(error);
  }
});

function createNotFoundError(message) {
  const error = new Error(message);
  error.status = 404;
  return error;
}

module.exports = router;
