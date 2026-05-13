# 📦 React + Node.js + TypeScript Base Bootstarter

This repository provides a clean and scalable base bootstarter for building
modern web applications using:

-   ⚛️ React (Vite + TypeScript) -- Frontend
-   🚀 Node.js (Express + TypeScript) -- Backend
-   🗄️ SQLite -- Database (easily replaceable)
-   🔌 Socket.IO -- Real-time communication

It also includes shared types between frontend and backend, enabling
better consistency and type safety across the entire application.
Features real-time data synchronization using WebSockets.

------------------------------------------------------------------------

## ▶️ How to Run the App

Install dependencies in all directories:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

Run both frontend and backend from root:

```bash
npm run dev
```

------------------------------------------------------------------------

## 🌐 Application Ports

-   Frontend (Vite): http://localhost:5173
-   Backend (Express): http://localhost:5000

------------------------------------------------------------------------

# 📁 Project Structure

## 📂 root

Main project directory.

Contains:
- Shared types
- Root scripts (run both client and server)

------------------------------------------------------------------------

## 📂 shared/

Contains shared TypeScript types used by both frontend and backend.

```
shared/
  types/
    User.ts       - User model definition
    Request.ts    - API request/response types
```

Purpose:
-   Avoid duplication of types
-   Keep frontend and backend in sync
-   Improve scalability and maintainability

### 📄 types/User.ts
```typescript
type User = {
  UserID: number
  UserName: string
}
```

### 📄 types/Request.ts
```typescript
type CreateUserBody = { UserName: string }
type DeleteUserBody = { UserID: number }
```

------------------------------------------------------------------------

## 📂 client/ (Frontend - Vite + React + TypeScript)

Modern frontend setup using Vite.

### 📂 public/

Static public assets (accessible directly).

⚠️ Do NOT store sensitive data here.

------------------------------------------------------------------------

### 📂 src/

Main application source code.

#### 📂 components/

Reusable UI components.
-   `Button.tsx` - Reusable button component
-   `Navbar.tsx` - Navigation bar
-   `components.css` - Component styling

#### 📂 pages/

Application pages (mapped to routes).
-   `data.tsx` - User management page with real-time updates

#### 📂 services/

Handles API communication and Socket.IO integration.
-   `apiService.ts` - Tests server connectivity
-   `userService.ts` - CRUD operations for users (fetch API)
-   `socket.ts` - Socket.IO client initialization and connection

#### 📂 hooks/

Custom React hooks for data management.
-   `useSocketUsers.ts` - Integrates user fetching with real-time Socket.IO updates

#### 📂 config/

Configuration files.
-   `api.ts` - API endpoint configuration

------------------------------------------------------------------------

### 📄 main.tsx

Application entry point.

### 📄 App.tsx

Main application component.

### 📄 App.css

Global application styles.

### 📄 vite.config.ts

Vite configuration.

------------------------------------------------------------------------

## 📂 server/ (Backend - Node.js + Express + TypeScript)

Backend API using Express with Socket.IO integration.

### 📂 controllers/

Handles business logic.
-   `dataController.ts` - User CRUD operations and Socket.IO event emissions

### 📂 routes/

Defines API endpoints.
-   `dataRoutes.ts` - User management routes (GET, POST, DELETE)

### 📂 data/

Database setup and storage.
-   `dataStore.ts` - SQLite database initialization and queries
-   `data.sql` - SQL schema and initial data

### 📂 midlewares/

Express middleware functions (for future expansion).

### 📂 models/

Data models (for future expansion).

------------------------------------------------------------------------

### 📄 index.ts

Main server entry point. Initializes Express, Socket.IO, CORS, and database connection.

### 📄 tsconfig.json

TypeScript configuration for the server.

------------------------------------------------------------------------

# 🔄 REST API Endpoints

## Get all users
```
GET /api/users
```
Returns an array of all users from the database.

## Create a new user
```
POST /api/users
Content-Type: application/json

{
  "UserName": "NewUser"
}
```
Adds a new user to the database and emits `newUser` event via Socket.IO to all connected clients.

## Delete a user
```
DELETE /api/users
Content-Type: application/json

{
  "UserID": 1
}
```
Removes a user from the database and emits `deleteUser` event via Socket.IO to all connected clients.

------------------------------------------------------------------------

# 🔌 Real-Time Communication (Socket.IO)

This application uses Socket.IO for real-time data synchronization between the server and all connected clients.

## Socket Events

### Server to Client
-   **newUser** - Emitted when a new user is added to the database
-   **deleteUser** - Emitted when a user is removed from the database

## Data Flow

### 1. User Addition
- Client sends POST request to `/api/users`
- Server controller adds user to SQLite database
- Controller emits `newUser` event via Socket.IO
- All connected clients receive the event and update their user list in real-time

### 2. User Deletion
- Client sends DELETE request to `/api/users`
- Server controller removes user from SQLite database
- Controller emits `deleteUser` event via Socket.IO
- All connected clients receive the event and update their user list in real-time

### 3. Initial Connection
- Client loads the data page
- `useSocketUsers()` hook fetches initial user list via REST API
- Socket.IO listeners are set up to receive subsequent updates
- No need for manual page refresh - all updates are automatic

## Custom Hooks

### useSocketUsers()
Located in `client/src/hooks/useSocketUsers.ts`

This hook encapsulates:
- Initial user data fetching
- Socket.IO event listeners setup
- State management for users
- Automatic cleanup on component unmount

**Usage in components**:
```typescript
const { users, loading, error } = useSocketUsers()
```

------------------------------------------------------------------------

# 🗄️ Database

This template uses **SQLite** with `better-sqlite3` for a lightweight, file-based database.

### Default Schema

```sql
CREATE TABLE Users (
  UserID INTEGER PRIMARY KEY AUTOINCREMENT,
  UserName TEXT NOT NULL UNIQUE
)
```

### Initial Data
The database comes pre-populated with 5 test users:
- Test1
- Test2
- Test3
- Test4
- Test5

------------------------------------------------------------------------

# 📋 Tech Stack Summary

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, TypeScript, React Router, React Bootstrap, Socket.IO Client |
| **Backend** | Node.js, Express, TypeScript, Socket.IO, better-sqlite3 |
| **Build** | Vite (frontend), tsx (backend TypeScript runtime) |
| **Development** | concurrently (run server and client simultaneously) |
| **Database** | SQLite |
| **Type Safety** | Shared TypeScript types across frontend and backend |

------------------------------------------------------------------------

# 🚀 Deployment

This project includes everything needed to run the frontend on **Vercel** and the backend on **Render**.

- Frontend deploy: https://vercel.com
- Backend deploy: https://render.com

> Both deployments should also include the environment variables defined in your `.env` files.

## Vercel

The frontend is configured to deploy with Vercel using the following settings:

- Framework Preset: `Vite`
- Install command: `cd client && npm install && npm run build`
- Build command: `cd client && npm run build`
- Output directory: `client/dist`

### Notes for Vercel
- Add environment variables from your `.env` files in Vercel dashboard after deployment.
- If needed, configure the Vercel project root to the repository root and set the build command as shown above.

## Render

The backend is configured to deploy with Render using the following settings:

- Service type: `Web Service`
- Build command: `cd server && npm install && npm run build`
- Start command: `cd server && npm start`

### Notes for Render
- Add environment variables from your `.env` files in Render dashboard after deployment.

------------------------------------------------------------------------

# 🎯 Template Purpose

This template is designed to:

-   🚀 Speed up project setup
-   🧱 Provide a scalable architecture
-   🔗 Share types between frontend and backend
-   📦 Support modern tooling (Vite + TypeScript)
-   🧠 Encourage clean code practices
-   ⚡ Implement real-time communication with Socket.IO
-   🔄 Demonstrate data synchronization patterns
-   🌍 Support multi-client scenarios with instant updates

------------------------------------------------------------------------

# ⚡ Summary

This template provides a solid foundation for building full-stack applications with:

-   Type safety across the stack
-   Clean separation of concerns
-   Scalable structure for real-world SaaS applications
-   Real-time data synchronization via Socket.IO WebSockets
-   Modern development experience with hot module reloading
-   Database abstraction layer for easy switching between databases
-   Reusable components and services
-   Production-ready project structure
