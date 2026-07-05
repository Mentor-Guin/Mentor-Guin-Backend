const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'MentorGuin Backend API',
    version: '1.0.0',
    description: 'API documentation for the current MentorGuin Backend endpoints.',
  },
  servers: [
    {
      url: '/api',
      description: 'Current API base path',
    },
  ],
  tags: [
    { name: 'System', description: 'Service health and metadata' },
    { name: 'Home', description: 'Home dashboard data' },
    { name: 'Modules', description: 'Current module progress' },
    { name: 'Assignments', description: 'Learner assignments' },
    { name: 'Lessons', description: 'Lesson catalog and AI study helpers' },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Check service health',
        responses: {
          200: {
            description: 'Service is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status', 'service', 'ai_mode'],
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    service: { type: 'string', example: 'MentorGuin Backend' },
                    ai_mode: {
                      type: 'string',
                      enum: ['groq', 'mock'],
                      example: 'mock',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/home': {
      get: {
        tags: ['Home'],
        summary: 'Get home summary',
        responses: {
          200: {
            description: 'Home summary',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HomeSummary' },
              },
            },
          },
        },
      },
    },
    '/modules/current': {
      get: {
        tags: ['Modules'],
        summary: 'Get current module progress',
        responses: {
          200: {
            description: 'Current module progress',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ModuleProgress' },
              },
            },
          },
        },
      },
    },
    '/assignments': {
      get: {
        tags: ['Assignments'],
        summary: 'List assignments',
        responses: {
          200: {
            description: 'Assignments',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Assignment' },
                },
              },
            },
          },
        },
      },
    },
    '/lessons': {
      get: {
        tags: ['Lessons'],
        summary: 'List lessons',
        responses: {
          200: {
            description: 'Lesson list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['lessons'],
                  properties: {
                    lessons: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Lesson' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/lessons/{lessonId}': {
      get: {
        tags: ['Lessons'],
        summary: 'Get a lesson by ID',
        parameters: [{ $ref: '#/components/parameters/LessonId' }],
        responses: {
          200: {
            description: 'Lesson',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Lesson' },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/lessons/{lessonId}/quiz/generate': {
      post: {
        tags: ['Lessons'],
        summary: 'Generate a quiz for a lesson',
        parameters: [{ $ref: '#/components/parameters/LessonId' }],
        responses: {
          200: {
            description: 'Generated quiz',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Quiz' },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/lessons/{lessonId}/notes/generate': {
      post: {
        tags: ['Lessons'],
        summary: 'Generate study notes for a lesson',
        parameters: [{ $ref: '#/components/parameters/LessonId' }],
        responses: {
          200: {
            description: 'Generated study notes',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StudyNote' },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
  },
  components: {
    parameters: {
      LessonId: {
        name: 'lessonId',
        in: 'path',
        required: true,
        schema: { type: 'string', example: 'figma-basics' },
      },
    },
    responses: {
      NotFound: {
        description: 'Resource was not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
    },
    schemas: {
      HomeSummary: {
        type: 'object',
        required: ['user_name', 'pending_assignments', 'completed_lessons', 'streak_days'],
        properties: {
          user_name: { type: 'string', example: 'Learner' },
          pending_assignments: { type: 'integer', example: 2 },
          completed_lessons: { type: 'integer', example: 3 },
          streak_days: { type: 'integer', example: 5 },
        },
      },
      ModuleProgress: {
        type: 'object',
        required: ['module_title', 'completed_lessons', 'total_lessons'],
        properties: {
          module_title: {
            type: 'string',
            example: 'Understand UX/UI and Principles',
          },
          completed_lessons: { type: 'integer', example: 1 },
          total_lessons: { type: 'integer', example: 4 },
        },
      },
      Assignment: {
        type: 'object',
        required: ['id', 'title', 'description', 'due_date', 'is_completed'],
        properties: {
          id: { type: 'string', example: 'assignment-1' },
          title: { type: 'string', example: 'Wireframe a login screen' },
          description: {
            type: 'string',
            example: 'Create a low-fidelity wireframe for a mobile login flow in Figma.',
          },
          due_date: { type: 'string', format: 'date', example: '2026-06-15' },
          is_completed: { type: 'boolean', example: false },
        },
      },
      Lesson: {
        type: 'object',
        required: [
          'id',
          'title',
          'lesson_number',
          'player_title',
          'video_duration',
          'about_description',
          'youtube_video_id',
          'youtube_url',
          'thumbnail_url',
          'thumbnail_label',
          'status',
        ],
        properties: {
          id: { type: 'string', example: 'figma-basics' },
          title: { type: 'string', example: 'Learn Figma in Under 5 Minutes (2025)' },
          lesson_number: { type: 'integer', example: 1 },
          player_title: { type: 'string', example: 'Learn Figma in Under 5 Minutes' },
          video_duration: { type: 'string', example: '5:12' },
          about_description: {
            type: 'string',
            example: 'Get started with Figma fast.',
          },
          youtube_video_id: { type: 'string', example: 'jw_l5LSeXsg' },
          youtube_url: {
            type: 'string',
            format: 'uri',
            example: 'https://www.youtube.com/watch?v=jw_l5LSeXsg',
          },
          thumbnail_url: {
            type: 'string',
            format: 'uri',
            example: 'https://img.youtube.com/vi/jw_l5LSeXsg/hqdefault.jpg',
          },
          thumbnail_label: { type: 'string', example: 'LEARN FIGMA' },
          status: {
            type: 'string',
            enum: ['current', 'next', 'locked'],
            example: 'current',
          },
        },
      },
      Quiz: {
        type: 'object',
        required: ['lesson_id', 'title', 'questions'],
        properties: {
          lesson_id: { type: 'string', example: 'figma-basics' },
          title: { type: 'string', example: 'Figma Basics Quiz' },
          questions: {
            type: 'array',
            items: { $ref: '#/components/schemas/QuizQuestion' },
          },
        },
      },
      QuizQuestion: {
        type: 'object',
        required: ['question', 'options', 'answer', 'explanation'],
        properties: {
          question: { type: 'string', example: 'What is a frame used for in Figma?' },
          options: {
            type: 'array',
            items: { type: 'string' },
            example: ['Layout boundaries', 'Database records', 'API keys', 'Git branches'],
          },
          answer: { type: 'string', example: 'Layout boundaries' },
          explanation: {
            type: 'string',
            example: 'Frames define screen or component boundaries in a design.',
          },
        },
      },
      StudyNote: {
        type: 'object',
        required: ['lesson_id', 'title', 'summary', 'key_points', 'action_items'],
        properties: {
          lesson_id: { type: 'string', example: 'figma-basics' },
          title: { type: 'string', example: 'Figma Basics Notes' },
          summary: { type: 'string', example: 'This lesson introduces core Figma tools.' },
          key_points: {
            type: 'array',
            items: { type: 'string' },
            example: ['Use frames for screens', 'Group reusable UI into components'],
          },
          action_items: {
            type: 'array',
            items: { type: 'string' },
            example: ['Create one mobile frame', 'Add text and shape layers'],
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        required: ['error', 'message'],
        properties: {
          error: { type: 'string', example: 'Not Found' },
          message: { type: 'string', example: 'Lesson not found' },
        },
      },
    },
  },
};

module.exports = openApiSpec;
