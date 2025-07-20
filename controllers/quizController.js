const quizModel = require('../models/quizModel');

exports.createQuiz = (req, res) => {
  try {
    const quizId = quizModel.createQuiz(req.body);
    res.status(201).json({ id: quizId });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getQuiz = (req, res) => {
  try {
    const quiz = quizModel.getQuiz(req.params.quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    const questions = quizModel.getQuizQuestionsWithoutAnswers(quiz);
    res.json({ id: quiz.id, title: quiz.title, questions });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.submitAnswer = (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { user_id, selected_option } = req.body;
    const result = quizModel.submitAnswer(quizId, questionId, user_id, selected_option);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getResults = (req, res) => {
  try {
    const { quizId, userId } = req.params;
    const result = quizModel.getResults(quizId, userId);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}; 