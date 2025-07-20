const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { createQuizSchema, submitAnswerSchema } = require('../validators/quizValidator');
const validate = require('../validators/validate');

router.post('/quizzes', validate(createQuizSchema), quizController.createQuiz);
router.get('/quizzes/:quizId', quizController.getQuiz);
router.post('/quizzes/:quizId/questions/:questionId/answer', validate(submitAnswerSchema), quizController.submitAnswer);
router.get('/quizzes/:quizId/results/:userId', quizController.getResults);

module.exports = router; 