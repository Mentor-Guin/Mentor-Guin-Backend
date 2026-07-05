const app = require('./app');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`MentorGuin Backend running on http://localhost:${PORT}`);
    console.log(`API base: http://localhost:${PORT}/api`);
    console.log(
      `AI mode: ${process.env.GROQ_API_KEY ? 'Groq' : 'mock (set GROQ_API_KEY for real AI)'}`,
    );
  });
}

module.exports = app;
