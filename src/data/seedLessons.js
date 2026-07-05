/**
 * Seed lessons aligned with MentorGuin Mobile course flow.
 * Each lesson links to a public YouTube tutorial.
 */

const YOUTUBE_WATCH = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;
const YOUTUBE_THUMB = (videoId) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

const lessons = [
  {
    id: 'figma-basics',
    title: 'Learn Figma in Under 5 Minutes (2025)',
    lesson_number: 1,
    player_title: 'Learn Figma in Under 5 Minutes',
    video_duration: '5:12',
    about_description:
      'Get started with Figma fast. This lesson walks through the core tools, frames, and basics you need to design your first mobile screen with confidence.',
    youtube_video_id: 'jw_l5LSeXsg',
    youtube_url: YOUTUBE_WATCH('jw_l5LSeXsg'),
    thumbnail_url: YOUTUBE_THUMB('jw_l5LSeXsg'),
    thumbnail_label: 'LEARN FIGMA',
    status: 'current',
    ai_context:
      'Introductory Figma tutorial covering the interface, frames, basic shapes, text, and exporting. Focus on helping beginners create their first mobile screen quickly.',
  },
  {
    id: 'auto-layout',
    title: 'Figma Auto Layout Tutorial for Beginners',
    lesson_number: 2,
    player_title: 'The 4 Most Important Laws of UX Design',
    video_duration: '12:45',
    about_description:
      "Learn the fundamental principles that guide how users think, interact, and make decisions in digital products. In this lesson, you'll explore four essential UX laws that help you design interfaces that feel simple, intuitive, and user-friendly.",
    youtube_video_id: 'Pk29F1cRjT4',
    youtube_url: YOUTUBE_WATCH('Pk29F1cRjT4'),
    thumbnail_url: YOUTUBE_THUMB('Pk29F1cRjT4'),
    thumbnail_label: 'Auto Layout',
    status: 'next',
    ai_context:
      'UX design fundamentals covering Hick\'s Law, Fitts\'s Law, Jakob\'s Law, and Miller\'s Law. Explain how each law affects interface design and user decision-making.',
  },
  {
    id: 'design-system',
    title: 'Building a Design System in Figma',
    lesson_number: 3,
    player_title: 'Building a Design System in Figma',
    video_duration: '18:20',
    about_description:
      'Learn how to organize colors, typography, and components into a reusable design system that keeps your product consistent as it grows.',
    youtube_video_id: 'YpKeE3-WH00',
    youtube_url: YOUTUBE_WATCH('YpKeE3-WH00'),
    thumbnail_url: YOUTUBE_THUMB('YpKeE3-WH00'),
    thumbnail_label: 'Design System',
    status: 'locked',
    ai_context:
      'Design systems in Figma: color styles, text styles, component libraries, variants, and maintaining consistency across a product team.',
  },
  {
    id: 'prototype',
    title: 'Interactive Prototyping Basics',
    lesson_number: 4,
    player_title: 'Interactive Prototyping Basics',
    video_duration: '14:08',
    about_description:
      'Turn static screens into clickable prototypes so you can test flows, share ideas, and validate interactions before development.',
    youtube_video_id: '2V1-UmeyyeM',
    youtube_url: YOUTUBE_WATCH('2V1-UmeyyeM'),
    thumbnail_url: YOUTUBE_THUMB('2V1-UmeyyeM'),
    thumbnail_label: 'Prototype',
    status: 'locked',
    ai_context:
      'Figma prototyping: connecting frames, transitions, overlays, smart animate, and sharing prototypes for user testing.',
  },
];

const moduleProgress = {
  module_title: 'Understand UX/UI and Principles 📕',
  completed_lessons: 1,
  total_lessons: lessons.length,
};

const homeSummary = {
  user_name: 'Learner',
  pending_assignments: 2,
  completed_lessons: 3,
  streak_days: 5,
};

const assignments = [
  {
    id: 'assignment-1',
    title: 'Wireframe a login screen',
    description: 'Create a low-fidelity wireframe for a mobile login flow in Figma.',
    due_date: '2026-06-15',
    is_completed: false,
  },
  {
    id: 'assignment-2',
    title: 'Apply UX laws to a dashboard',
    description: 'Redesign a dashboard using at least two UX laws from the lesson.',
    due_date: '2026-06-22',
    is_completed: false,
  },
];

module.exports = {
  lessons,
  moduleProgress,
  homeSummary,
  assignments,
};
