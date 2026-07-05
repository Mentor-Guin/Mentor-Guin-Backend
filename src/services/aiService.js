/**
 * Generates quizzes and study notes from lesson metadata.
 * Uses Groq when GROQ_API_KEY is set; otherwise returns structured mock output.
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

function buildLessonPrompt(lesson) {
  return [
    `Lesson title: ${lesson.player_title}`,
    `Full title: ${lesson.title}`,
    `Duration: ${lesson.video_duration}`,
    `YouTube: ${lesson.youtube_url}`,
    `Description: ${lesson.about_description}`,
    `Teaching context: ${lesson.ai_context}`,
  ].join('\n');
}

function generateMockQuiz(lesson) {
  const topic = lesson.player_title;
  return {
    lesson_id: lesson.id,
    title: `Quiz: ${topic}`,
    source: 'mock',
    questions: [
      {
        id: `${lesson.id}-q1`,
        question: `What is the main focus of "${topic}"?`,
        options: [
          lesson.about_description.slice(0, 72).trim() + '…',
          'Memorizing keyboard shortcuts only',
          'Publishing apps to the App Store',
          'Writing backend API code',
        ],
        correct_index: 0,
      },
      {
        id: `${lesson.id}-q2`,
        question: `Which tool/platform is this lesson primarily about?`,
        options: ['Figma / UX design', 'Excel spreadsheets', 'Git version control', 'SQL databases'],
        correct_index: 0,
      },
      {
        id: `${lesson.id}-q3`,
        question: `Why is "${topic}" useful for beginners?`,
        options: [
          'It builds practical design skills quickly',
          'It replaces the need to learn fundamentals',
          'It is only for senior designers',
          'It focuses on print design only',
        ],
        correct_index: 0,
      },
      {
        id: `${lesson.id}-q4`,
        question: `What should you do after watching the video (${lesson.video_duration})?`,
        options: [
          'Practice the concepts in a small project',
          'Skip hands-on practice',
          'Uninstall Figma immediately',
          'Ignore UX principles entirely',
        ],
        correct_index: 0,
      },
    ],
  };
}

function generateMockNote(lesson) {
  const sentences = lesson.about_description
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

  return {
    lesson_id: lesson.id,
    title: `AI Notes: ${lesson.player_title}`,
    source: 'mock',
    summary: lesson.about_description,
    key_points: [
      `Watch: ${lesson.youtube_url}`,
      `Duration: ${lesson.video_duration}`,
      ...sentences.slice(0, 3),
      lesson.ai_context.split('. ')[0] + '.',
    ],
    action_items: [
      'Rewatch key sections and pause to follow along in Figma.',
      'Recreate one screen from the tutorial without looking at the video.',
      'Write down three takeaways in your own words.',
    ],
  };
}

async function callGroq(apiKey, systemPrompt, userPrompt) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq request failed (${response.status}): ${errorBody}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Groq returned an empty response');
  }

  return JSON.parse(content);
}

function getAiMode() {
  return process.env.GROQ_API_KEY ? 'groq' : 'mock';
}

async function generateQuiz(lesson) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return generateMockQuiz(lesson);
  }

  try {
    const parsed = await callGroq(
      apiKey,
      'You create educational multiple-choice quizzes. Respond with JSON only using this shape: {"title":"string","questions":[{"id":"string","question":"string","options":["string","string","string","string"],"correct_index":0}]}. Provide exactly 4 questions with 4 options each.',
      buildLessonPrompt(lesson),
    );

    return {
      lesson_id: lesson.id,
      title: parsed.title || `Quiz: ${lesson.player_title}`,
      source: 'groq',
      questions: (parsed.questions || []).map((question, index) => ({
        id: question.id || `${lesson.id}-q${index + 1}`,
        question: question.question,
        options: question.options,
        correct_index: question.correct_index ?? 0,
      })),
    };
  } catch (error) {
    console.error('Groq quiz generation failed, using mock fallback:', error.message);
    const mock = generateMockQuiz(lesson);
    mock.source = 'mock-fallback';
    mock.warning = error.message;
    return mock;
  }
}

async function generateNote(lesson) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return generateMockNote(lesson);
  }

  try {
    const parsed = await callGroq(
      apiKey,
      'You create concise study notes for video lessons. Respond with JSON only using this shape: {"title":"string","summary":"string","key_points":["string"],"action_items":["string"]}.',
      buildLessonPrompt(lesson),
    );

    return {
      lesson_id: lesson.id,
      title: parsed.title || `AI Notes: ${lesson.player_title}`,
      source: 'groq',
      summary: parsed.summary || lesson.about_description,
      key_points: parsed.key_points || [],
      action_items: parsed.action_items || [],
    };
  } catch (error) {
    console.error('Groq note generation failed, using mock fallback:', error.message);
    const mock = generateMockNote(lesson);
    mock.source = 'mock-fallback';
    mock.warning = error.message;
    return mock;
  }
}

module.exports = {
  generateQuiz,
  generateNote,
  getAiMode,
};
