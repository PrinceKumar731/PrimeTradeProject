# Scalable REST API with Auth, RBAC, and Task CRUD

Production-style full-stack project built with JavaScript only.

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Swagger
- Frontend: React, Vite, Axios, React Router

## Features

- User registration
- User login
- Password hashing with `bcryptjs`
- JWT authentication
- Role-based access control
- Task CRUD APIs
- Request validation with `express-validator`
- Centralized error handling
- Swagger API documentation
- Postman collection
- React frontend for auth and task management

## Project Structure

```text
backend/
  src/
    config/
    controllers/
    docs/
    middleware/
    models/
    routes/
    services/
    utils/
    validators/
    app.js
    server.js

frontend/
  src/
    components/
    pages/
    services/
    utils/
    App.jsx
    main.jsx
```

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator
- Swagger

### Frontend

- React
- Vite
- Axios
- React Router

## Prerequisites

- Node.js 18+
- npm 10+
- MongoDB running locally or a valid MongoDB connection string

## Environment Variables

### Backend

Create [`backend/.env`](/c:/Users/Prince%20Kumar/Desktop/projects/crud/backend/.env) based on [`backend/.env.example`](/c:/Users/Prince%20Kumar/Desktop/projects/crud/backend/.env.example).

```env
NODE_ENV=development
PORT=5000
API_VERSION=v1
MONGODB_URI=mongodb://127.0.0.1:27017/scalable_rest_api
JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

### Frontend

Create [`frontend/.env`](/c:/Users/Prince%20Kumar/Desktop/projects/crud/frontend/.env) based on [`frontend/.env.example`](/c:/Users/Prince%20Kumar/Desktop/projects/crud/frontend/.env.example).

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Running the Project

Open two terminals.

### Start the backend

```bash
cd backend
npm run dev
```

Backend runs at `http://localhost:5000`.

### Start the frontend

```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Documentation

Swagger UI:

- `http://localhost:5000/api-docs`

Postman collection:

- [`backend/src/docs/scalable-rest-api.postman_collection.json`](/c:/Users/Prince%20Kumar/Desktop/projects/crud/backend/src/docs/scalable-rest-api.postman_collection.json)

## Main API Endpoints

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Users

- `GET /api/v1/users/me`
- `GET /api/v1/users/admin-summary`

### Tasks

- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks/:taskId`
- `PUT /api/v1/tasks/:taskId`
- `DELETE /api/v1/tasks/:taskId`

## Frontend Pages

- `/`
- `/auth`
- `/dashboard`

## Authentication Flow

1. Register or log in from the frontend.
2. Backend returns a JWT token and user payload.
3. Frontend stores the token in `localStorage`.
4. Protected requests send `Authorization: Bearer <token>`.
5. The dashboard becomes accessible only for authenticated users.

## Validation and Error Handling

- Route validation is handled with `express-validator`.
- Invalid payloads return `400`.
- Invalid credentials return `401`.
- Forbidden access returns `403`.
- Missing resources return `404`.
- Duplicate keys return `409`.
- Unexpected errors return `500`.

## Build Commands

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

## Scalability Note

### Microservices Architecture

This project is currently a modular monolith, which is the right starting point for a production-grade CRUD system. As traffic and domain complexity grow, the backend can be split into focused services such as:

- Auth service
- User service
- Task service
- Notification service

The current controller-service separation makes that migration easier because business logic is already separated from route wiring.

### Caching

Redis can be introduced to reduce repeated reads and improve response times. Typical candidates:

- cached task list responses
- token blacklist or session metadata
- rate limiting counters
- frequently accessed admin dashboard summaries

Caching should be added carefully with invalidation rules for task create, update, and delete operations.

### Load Balancing

For horizontal scaling, the API can run behind a load balancer such as NGINX, HAProxy, or a cloud load balancer. This allows:

- multiple Node.js instances
- better fault tolerance
- improved traffic distribution
- zero-downtime deployments

When using multiple app instances, shared concerns such as cache, database, and any session/token coordination should be externalized.

## Future Improvements

- Refresh token flow
- Role management UI
- Pagination controls in the frontend
- Docker support
- Winston logging
- Redis caching
- Automated tests

## Authoring Notes

This project was built step by step in a GitHub-style workflow, with backend and frontend features added incrementally instead of generating the entire project at once.
