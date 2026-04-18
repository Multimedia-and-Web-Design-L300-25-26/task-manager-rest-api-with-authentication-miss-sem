# Task Manager REST API with Authentication

## Overview

In this assignment, you will build a RESTful API using Node.js, Express, and MongoDB. The system must implement user authentication using JSON Web Tokens (JWT) and protected task management routes. You are required to demonstrate proper project structure, authentication, authorization, and database integration.

---

## Setup Instructions

Install all project dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then update the `.env` file with the following configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not commit the `.env` file to version control.

---

## Running the Application

Start the server in development mode:

```bash
npm run dev
```

Start the server in production mode:

```bash
npm start
```

The application must start successfully and connect to MongoDB without errors.

---

## Running Tests

Run the automated tests using:

```bash
npm test
```

All tests must pass before submission.

---

## Functional Requirements

### Authentication Routes

1. `POST /api/auth/register`
   - Register a new user
   - Email must be unique
   - Password must be hashed before storing
   - Return user information without the password

2. `POST /api/auth/login`
   - Validate user credentials
   - Return a JWT token upon successful login

---

### Protected Task Routes

All task routes must require authentication using the following header:

```
Authorization: Bearer <token>
```

Implement the following routes:

1. `POST /api/tasks`
   - Create a new task
   - The task must belong to the authenticated user

2. `GET /api/tasks`
   - Return only tasks that belong to the authenticated user

3. `DELETE /api/tasks/:id`
   - Only the owner of the task can delete it
   - Return appropriate error responses for unauthorized access

---

## Technical Requirements

- Use ES Modules (import/export)
- Use Mongoose for database modeling
- Implement authentication middleware
- Use proper HTTP status codes
- Follow a clean project structure
- Do not store passwords in plain text
- Make meaningful Git commits
- Ensure no sensitive files are committed

---

## Project Structure

```
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   └── app.js
├── tests/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Environment Variables

| Variable     | Description                        |
|--------------|------------------------------------|
| `PORT`       | Port the server runs on            |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

---

## API Reference

### Auth Endpoints

| Method | Endpoint               | Description         | Auth Required |
|--------|------------------------|---------------------|---------------|
| POST   | `/api/auth/register`   | Register a new user | No            |
| POST   | `/api/auth/login`      | Login and get token | No            |

### Task Endpoints

| Method | Endpoint           | Description                  | Auth Required |
|--------|--------------------|------------------------------|---------------|
| POST   | `/api/tasks`       | Create a new task            | Yes           |
| GET    | `/api/tasks`       | Get all tasks for the user   | Yes           |
| DELETE | `/api/tasks/:id`   | Delete a task by ID          | Yes           |

---

## Submission

Push your final solution to the GitHub Classroom repository. The project will be automatically evaluated using tests. Ensure all tests pass successfully before submitting.

Good luck.