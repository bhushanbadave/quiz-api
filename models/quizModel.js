const { v4: uuidv4 } = require('uuid');

// In-memory data stores
const quizzes = {};
const userAnswers = {};

function createQuiz(quiz) {
  const quizId = uuidv4();
  const questions = quiz.questions.map(q => ({
    id: uuidv4(),
    text: q.text,
    options: q.options,
    correct_option: q.correct_option
  }));
  quizzes[quizId] = {
    id: quizId,
    title: quiz.title,
    questions
  };
  return quizId;
}

function getQuiz(quizId) {
  return quizzes[quizId];
}

function getQuizQuestionsWithoutAnswers(quiz) {
  return quiz.questions.map(q => ({
    id: q.id,
    text: q.text,
    options: q.options
  }));
}

function submitAnswer(quizId, questionId, user_id, selected_option) {
  const quiz = quizzes[quizId];
  if (!quiz) return { error: 'Quiz not found', status: 404 };
  const question = quiz.questions.find(q => q.id === questionId);
  if (!question) return { error: 'Question not found', status: 404 };
  if (!userAnswers[quizId]) userAnswers[quizId] = {};
  if (!userAnswers[quizId][user_id]) userAnswers[quizId][user_id] = [];
  const alreadyAnswered = userAnswers[quizId][user_id].find(a => a.question_id === questionId);
  if (alreadyAnswered) {
    return { error: 'Question already answered', status: 400 };
  }
  const is_correct = question.correct_option === selected_option;
  userAnswers[quizId][user_id].push({
    question_id: questionId,
    selected_option,
    is_correct
  });
  return {
    is_correct,
    correct_option: is_correct ? undefined : question.correct_option
  };
}

function getResults(quizId, userId) {
  const quiz = quizzes[quizId];
  if (!quiz) return { error: 'Quiz not found', status: 404 };
  const answers = (userAnswers[quizId] && userAnswers[quizId][userId]) || [];
  const score = answers.filter(a => a.is_correct).length;
  return {
    quiz_id: quizId,
    user_id: userId,
    score,
    answers
  };
}

module.exports = {
  createQuiz,
  getQuiz,
  getQuizQuestionsWithoutAnswers,
  submitAnswer,
  getResults
}; 