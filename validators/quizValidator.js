const Joi = require('joi');

const createQuizSchema = Joi.object({
  title: Joi.string().min(1).required(),
  questions: Joi.array().items(
    Joi.object({
      text: Joi.string().min(1).required(),
      options: Joi.array().items(Joi.string().min(1)).length(4).required(),
      correct_option: Joi.number().integer().min(0).max(3).required()
    })
  ).min(1).required()
});

const submitAnswerSchema = Joi.object({
  user_id: Joi.string().min(1).required(),
  selected_option: Joi.number().integer().min(0).max(3).required()
});

module.exports = {
  createQuizSchema,
  submitAnswerSchema
}; 