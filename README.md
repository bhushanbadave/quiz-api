# Quiz API

A RESTful backend service for managing and executing quizzes with multiple-choice questions.

## Features
- Create quizzes with multiple questions and options
- Fetch quizzes (without revealing correct answers)
- Submit answers and get immediate feedback
- Retrieve user results for a quiz

## Tech Stack
- Node.js
- Express
- In-memory storage

## Project Structure

```
quiz-api/
├── app.js               # Main application file
├── package.json         # NPM dependencies
├── Dockerfile           # Docker container definition
├── docker-compose.yml   # Docker Compose configuration
├── README.md            # Project documentation
├── tests/               # Integration tests (Jest + Supertest)
│   └── quiz.test.js
├── routes/              # Route definitions (optional for scalability)
│   └── quizRoutes.js
├── controllers/         # Logic handlers (optional modularization)
│   └── quizController.js
├── models/              # In-memory models or schemas
│   └── quizModel.js
└── validators/          # Joi validation schemas
```

- **app.js**: Main Express app setup and entry point
- **routes/**: Route definitions for quiz APIs
- **controllers/**: Business logic for each endpoint
- **models/**: In-memory data and helper functions
- **validators/**: Joi validation schemas (for future extensibility)
- **tests/**: Integration tests

## Setup & Run

### Local
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

### Docker Compose
1. Ensure Docker is installed.
2. Run:
   ```bash
   docker-compose up --build
   ```

## API Endpoints

### Create Quiz
- `POST /quizzes`
- Body: `{ "title": string, "questions": [{ "text": string, "options": [string, string, string, string], "correct_option": 0-3 }] }`
- Returns: `{ id: string }`

### Get Quiz
- `GET /quizzes/:quizId`
- Returns: `{ id, title, questions: [{ id, text, options }] }`

### Submit Answer
- `POST /quizzes/:quizId/questions/:questionId/answer`
- Body: `{ user_id: string, selected_option: 0-3 }`
- Returns: `{ is_correct: boolean, correct_option?: number }`

### Get Results
- `GET /quizzes/:quizId/results/:userId`
- Returns: `{ quiz_id, user_id, score, answers: [{ question_id, selected_option, is_correct }] }`

## Known Issues / Limitations
- All data is in-memory and will be lost on server restart.
- No authentication implemented.

## License
ISC 