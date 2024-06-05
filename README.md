---

# Task Management API

This is a simple RESTful API for managing tasks (to-do items) built using Node.js and Express.js. It includes basic CRUD operations and JWT-based authentication.

## Features

- **CRUD Operations**: Allows users to Create, Read, Update, and Delete tasks.
- **JWT Authentication**: Provides secure authentication using JSON Web Tokens.
- **Error Handling**: Gracefully handles errors and provides appropriate responses.
- **Nodemon Integration**: Utilizes Nodemon for automatic server restarts during development.

## Installation and Setup

### Install Dependencies

Ensure you have `express`, `nodemon` and `jsonwebtoken` installed:

```
npm install express jsonwebtoken nodemon;

```

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <Project-directory-name>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Getting Started

### Starting the Server

Run the following command to start the server:
```bash
npm run dev
```

The server will start running on `http://localhost:3000`.

### API Documentation

Explore the API endpoints using the following documentation:

---

## API Endpoints

### Authentication

#### Login
- **URL**: `/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
      "username": "user",
      "password": "password"
  }
  ```
- **Response**:
  ```json
  {
      "accessToken": "your_jwt_token_here"
  }
  ```

### Task Management

#### Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Description**: Retrieves a list of all tasks.
- **Response**:
  ```json
  [
      {
          "id": 1,
          "title": "Task 1",
          "description": "Description 1"
      },
      {
          "id": 2,
          "title": "Task 2",
          "description": "Description 2"
      }
  ]
  ```

#### Get Task by ID
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific task by ID.
- **Response**:
  ```json
  {
      "id": 1,
      "title": "Task 1",
      "description": "Description 1"
  }
  ```

#### Create a Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Creates a new task.
- **Headers**:
  - `Authorization: Bearer YOUR_JWT_TOKEN`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
      "title": "New Task",
      "description": "New Description"
  }
  ```
- **Response**:
  ```json
  {
      "id": 3,
      "title": "New Task",
      "description": "New Description"
  }
  ```

#### Update a Task by ID
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Description**: Updates an existing task by ID.
- **Headers**:
  - `Authorization: Bearer YOUR_JWT_TOKEN`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
      "title": "Updated Task",
      "description": "Updated Description"
  }
  ```
- **Response**:
  ```json
  {
      "id": 1,
      "title": "Updated Task",
      "description": "Updated Description"
  }
  ```

#### Delete a Task by ID
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Deletes a task by ID.
- **Headers**:
  - `Authorization: Bearer YOUR_JWT_TOKEN`
- **Response**:
  ```json
  {
      "message": "Task deleted successfully!"
  }
  ```

---

### Error Handling

If an error occurs, the API will respond with a status code of `500` and a message `Something went wrong!!`.

## Testing with Postman

1. **Create a new collection** and add requests for each endpoint.
2. **Login** to get the JWT token.
3. **Add the token** to the `Authorization` header for protected routes.


---
