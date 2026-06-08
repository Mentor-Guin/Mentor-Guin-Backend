const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('MentorGuin Backend is running');
});

// For Vercel, we export the app
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
