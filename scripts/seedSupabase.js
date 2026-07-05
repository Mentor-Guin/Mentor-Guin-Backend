require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const {
  lessons,
  moduleProgress,
  homeSummary,
  assignments,
} = require('../src/data/seedLessons');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.',
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function upsertOrThrow(table, rows, options = {}) {
  const { error } = await supabase.from(table).upsert(rows, options);
  if (error) {
    throw new Error(`${table} seed failed: ${error.message}`);
  }
  const count = Array.isArray(rows) ? rows.length : 1;
  console.log(`Seeded ${count} row(s) into ${table}`);
}

async function seed() {
  await upsertOrThrow('lessons', lessons, { onConflict: 'id' });

  await upsertOrThrow(
    'module_progress',
    {
      id: 'current',
      module_title: moduleProgress.module_title,
      completed_lessons: moduleProgress.completed_lessons,
      total_lessons: moduleProgress.total_lessons,
    },
    { onConflict: 'id' },
  );

  await upsertOrThrow(
    'home_summary',
    {
      id: 'default',
      user_name: homeSummary.user_name,
      pending_assignments: homeSummary.pending_assignments,
      completed_lessons: homeSummary.completed_lessons,
      streak_days: homeSummary.streak_days,
    },
    { onConflict: 'id' },
  );

  await upsertOrThrow('assignments', assignments, { onConflict: 'id' });
}

seed()
  .then(() => {
    console.log('Supabase seed complete.');
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
