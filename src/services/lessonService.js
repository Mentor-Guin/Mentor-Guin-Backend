const { lessons, moduleProgress } = require('../data/seedLessons');

function listLessons() {
  return lessons.map(publicLesson);
}

function getLessonById(lessonId) {
  const lesson = lessons.find((item) => item.id === lessonId);
  if (!lesson) return null;
  return publicLesson(lesson);
}

function getLessonRecord(lessonId) {
  return lessons.find((item) => item.id === lessonId) ?? null;
}

function getModuleProgress() {
  return moduleProgress;
}

function publicLesson(lesson) {
  return {
    id: lesson.id,
    title: lesson.title,
    lesson_number: lesson.lesson_number,
    player_title: lesson.player_title,
    video_duration: lesson.video_duration,
    about_description: lesson.about_description,
    youtube_video_id: lesson.youtube_video_id,
    youtube_url: lesson.youtube_url,
    thumbnail_url: lesson.thumbnail_url,
    thumbnail_label: lesson.thumbnail_label,
    status: lesson.status,
  };
}

module.exports = {
  listLessons,
  getLessonById,
  getLessonRecord,
  getModuleProgress,
};
