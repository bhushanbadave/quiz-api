const express = require('express');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(express.json());
app.use('/', quizRoutes);

// Error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Quiz API listening on port ${PORT}`);
  });
} 