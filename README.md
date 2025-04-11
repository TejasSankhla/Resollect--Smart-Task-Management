# Resollect - Smart Todo List Application

A modern, full-stack todo list application with automatic task status management, real-time updates, and an intuitive drag-and-drop interface.

## Features

- 🎯 Smart task status tracking (Ongoing, Success, Failure)
- ⏰ Automatic deadline monitoring
- 🔄 Real-time updates
- 🎨 Modern UI with Tailwind CSS
- 🌓 Dark/light mode
- 📱 Responsive design
- 🔄 Drag-and-drop functionality
- 💾 MongoDB database
- 🔒 TypeScript type safety

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React Query
- React DnD (Drag and Drop)

### Backend

- Express.js
- TypeScript
- MongoDB with Mongoose
- Node-cron for scheduled tasks

## Project Structure

```
resollect/
├── frontend/
│   ├── components/
│   │   ├── TaskCard.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskForm.tsx
│   │   └── Layout.tsx
│   ├── pages/
│   └── styles/
└── backend/
    ├── src/
    │   ├── config/
    │   │   ├── index.ts
    │   │   └── database.ts
    │   ├── controllers/
    │   │   └── taskController.ts
    │   ├── services/
    │   │   └── taskService.ts
    │   ├── models/
    │   │   └── Task.ts
    │   ├── routes/
    │   │   └── taskRoutes.ts
    │   ├── jobs/
    │   │   └── taskStatusUpdater.ts
    │   ├── app.ts
    │   └── index.ts
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

## API Documentation

### Task Endpoints

#### Get All Tasks

- **GET** `/api/tasks`
- Returns an array of all tasks
- Response: `200 OK`

```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "ongoing" | "success" | "failure",
    "deadline": "string (ISO date)",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
]
```

#### Create Task

- **POST** `/api/tasks`
- Request Body:

```json
{
  "title": "string",
  "description": "string",
  "deadline": "string (ISO date)"
}
```

- Response: `201 Created`

#### Update Task Status

- **PUT** `/api/tasks/:id/status`
- Request Body:

```json
{
  "status": "ongoing" | "success" | "failure"
}
```

- Response: `200 OK`

#### Delete Task

- **DELETE** `/api/tasks/:id`
- Response: `200 OK`

## Task Status Management

Tasks can have three statuses:

- **Ongoing**: Active tasks within their deadline
- **Success**: Completed tasks marked manually or before deadline
- **Failure**: Tasks that missed their deadline or marked as failed

The system automatically updates task statuses based on deadlines using a CRON job that runs every minute.
