const request = require('supertest');
const { v4: uuidv4 } = require('uuid');
const app = require('../app');

describe('Quiz API Integration', () => {
  let quizId, questionId, userId = uuidv4();
  const quizPayload = {
    title: 'Sample Quiz',
    questions: [
      {
        text: 'What is 2+2?',
        options: ['1', '2', '3', '4'],
        correct_option: 3
      }
    ]
  };

  it('should create a quiz', async () => {
    const res = await request(app).post('/quizzes').send(quizPayload);
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    quizId = res.body.id;
  });

  it('should get the quiz without correct answers', async () => {
    const res = await request(app).get(`/quizzes/${quizId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.questions[0].options.length).toBe(4);
    questionId = res.body.questions[0].id;
  });

  it('should submit a correct answer', async () => {
    const res = await request(app)
      .post(`/quizzes/${quizId}/questions/${questionId}/answer`)
      .send({ user_id: userId, selected_option: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.is_correct).toBe(true);
  });

  it('should submit an incorrect answer and get correct_option', async () => {
    const res = await request(app)
      .post(`/quizzes/${quizId}/questions/${questionId}/answer`)
      .send({ user_id: uuidv4(), selected_option: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.is_correct).toBe(false);
    expect(res.body.correct_option).toBe(3);
  });

  it('should get user results', async () => {
    const res = await request(app).get(`/quizzes/${quizId}/results/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.score).toBe(1);
    expect(res.body.answers.length).toBe(1);
  });

  it('should return 404 for non-existent quiz', async () => {
    const res = await request(app).get('/quizzes/nonexistent');
    expect(res.statusCode).toBe(404);
  });
}); 