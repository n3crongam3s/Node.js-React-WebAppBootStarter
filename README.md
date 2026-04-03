# 📦 React + Node.js + TypeScript Base Bootstarter

This repository provides a clean and scalable base bootstarter for building
modern web applications using:

-   ⚛️ React (Vite + TypeScript) -- Frontend
-   🚀 Node.js (Express + TypeScript) -- Backend
-   🗄️ SQLite -- Database (easily replaceable)

It also includes shared types between frontend and backend, enabling
better consistency and type safety across the entire application.

------------------------------------------------------------------------

## ▶️ How to Run the App

Install dependencies in all directories:

npm install cd client && npm install cd ../server && npm install

Run both frontend and backend from root:

npm run dev

------------------------------------------------------------------------

## 🌐 Application Ports

-   Frontend (Vite): http://localhost:5173
-   Backend (Express): http://localhost:5000

------------------------------------------------------------------------

# 📁 Project Structure

## 📂 root

Main project directory.

Contains: - Shared types - Root scripts (run both client and server)

------------------------------------------------------------------------

## 📂 shared/

Contains shared TypeScript types used by both frontend and backend.

shared/ types/ User.ts Request.ts

Purpose: - Avoid duplication of types - Keep frontend and backend in
sync - Improve scalability and maintainability

------------------------------------------------------------------------

## 📂 client/ (Frontend - Vite + React + TypeScript)

Modern frontend setup using Vite.

### 📂 public/

Static public assets (accessible directly).

⚠️ Do NOT store sensitive data here.

------------------------------------------------------------------------

### 📂 src/

Main application source code.

### 📂 components/

Reusable UI components.

### 📂 pages/

Application pages (mapped to routes).

### 📂 services/

Handles API communication (fetch / axios).

------------------------------------------------------------------------

### 📄 main.tsx

Application entry point.

### 📄 App.tsx

Main application component.

### 📄 vite.config.ts

Vite configuration.

------------------------------------------------------------------------

## 📂 server/ (Backend - Node.js + Express + TypeScript)

Backend API using Express.

### 📂 controllers/

Handles business logic.

### 📂 routes/

Defines API endpoints.

### 📂 data/

Database setup and storage.

------------------------------------------------------------------------

### 📄 index.ts

Main server entry point.

------------------------------------------------------------------------

# 🔄 API Example

GET /api/users

POST /api/users

DELETE /api/users

------------------------------------------------------------------------

# 🎯 Template Purpose

This template is designed to:

-   🚀 Speed up project setup
-   🧱 Provide a scalable architecture
-   🔗 Share types between frontend and backend
-   📦 Support modern tooling (Vite + TypeScript)
-   🧠 Encourage clean code practices

------------------------------------------------------------------------

# ⚡ Summary

This template provides a solid foundation for building full-stack
applications with:

-   Type safety across the stack
-   Clean separation of concerns
-   Scalable structure for real-world SaaS applications
