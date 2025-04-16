# Lightweight SaaS Management Platform

A modern, full-stack project management SaaS application built with clean architecture principles.

## Project Overview

This application is a lightweight SaaS platform for managing projects and tasks. It includes:

- Authentication system with JWT tokens
- Project management functionality
- Task management with drag-and-drop interface
- Clean architecture design
- Responsive UI

## Tech Stack

### Backend
- Node.js with Express
- PostgreSQL with Sequelize ORM
- JWT for authentication
- Clean Architecture pattern

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Context API for state management
- DND Kit for drag-and-drop functionality

## Architecture

The project follows clean architecture principles:

- **Backend**:
    - Domain: Entities and interfaces
    - Application: Use cases and DTOs
    - Infrastructure: Implementation details
    - Interfaces: HTTP controllers and routes

- **Frontend**:
    - App: Next.js app and pages
    - Components: Reusable UI components
    - Lib: Utilities, context, types, and API integration

## Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Docker (optional)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/gauss2302/light_weight_saas.git
   cd light_weight_saas
   ```

2. Backend setup:
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Update with your database credentials
   ```

3. Frontend setup:
   ```bash
   cd client
   npm install
   cp .env.example .env.local  # Update with your API URL
   ```

4. Start the development servers:
    - Backend: `npm run dev` (from the backend directory)
    - Frontend: `npm run dev` (from the client directory)

### Docker Setup (Alternative)

```bash
docker-compose up -d
```

## Features

- **Authentication**:
    - Register, login, token refresh
    - Protected routes

- **Project Management**:
    - Create, read, update, delete projects
    - Project status tracking

- **Task Management**:
    - Create, read, update, delete tasks
    - Drag-and-drop interface for status updates
    - Priority levels and due dates
    - Task filtering and organization

## API Documentation

The API follows RESTful principles with these main endpoints:

- **Auth**: `/api/auth/*`
- **Projects**: `/api/projects/*`
- **Tasks**: `/api/tasks/*`

A detailed API documentation is available at `/api/docs` when running the backend server.

## Deployment

### Backend
- The backend can be deployed to any Node.js hosting service like Heroku, Railway, or a VPS.
- Make sure to set proper environment variables.

### Frontend
- The Next.js frontend can be deployed to Vercel, Netlify, or any static hosting service.
- Set the `NEXT_PUBLIC_BACKEND_URL` to point to your backend API.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Clean Architecture principles by Robert C. Martin
- Next.js App Router
- Tailwind CSS community
