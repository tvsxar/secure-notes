# Secure Notes (Notedly)

A secure notes application built with the **PERN stack** (PostgreSQL, Express.js, React, Node.js).  
This project allows users to register, log in, and manage private notes with full CRUD operations, search functionality, and a modern responsive UI.


---

## Table of Contents

- [Description](#description)
- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies & Stack Explanation](#technologies--stack-explanation)
- [Architecture & Flow](#architecture--flow)
- [Installation & Run](#installation--run)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Author](#author)

---

## Description

Secure Notes allows you to:

- Register and log in securely with JWT and cookies  
- Create, read, update, and delete notes  
- Search notes by title and description  
- View your personal notes in a responsive, modern UI  

Backend is built with **Node.js + Express.js** and **PostgreSQL**.  
Frontend is built with **React (Vite)** and styled with **Tailwind CSS**.  

---

## Live Demo

Try it online via our [Live Demo](https://secure-notes-backend-icl1.onrender.com)!

---

## Features

- User registration, login, and authentication with JWT and cookies  
- Notes CRUD (Create, Read, Update, Delete)  
- Search notes by title and description  
- Responsive UI with modals for adding/editing notes  
- Full **PERN stack** setup (PostgreSQL, Express.js, React, Node.js)  

---

## Technologies & Stack Explanation

- **PostgreSQL** — relational database to store user and notes data  
- **Express.js / Node.js** — backend REST API  
- **React (Vite)** — frontend framework for building UI  
- **pg** — PostgreSQL client for Node.js  
- **Tailwind CSS** — utility-first styling  
- **axios** — for HTTP requests from frontend  
- **Docker & Docker Compose** — for containerization and environment orchestration

---

## Architecture & Flow

1. React frontend sends HTTP requests to the backend API.  
2. Express.js backend receives requests and queries PostgreSQL.  
3. Backend returns JSON data.  
4. Frontend updates the UI and state based on API responses.  
5. Authentication is handled via JWT in cookies.  
6. Search and filtering of notes happen on the backend.  
7. In development, Docker Volumes ensure instant Hot Reload for both services. 

---

## Installation & Run

### 1. The Quickest Way (Docker Compose)

_Requires [Docker](https://www.docker.com/get-started/)_

1. Create a `.env` file inside `backend/` (see variables below)
2. Run everything with one command:
   ```bash
   docker-compose up --build
   ```
3. Open http://localhost:5173 in your browser

### 2. Manual Setup (For Development)

If you want to run the services separately without Docker:

#### Backend

```bash
cd backend
npm install jsonwebtoken dotenv cors pg bcryptjs cookie-parser express nodemon
# Create .env with PORT, DATABASE_URL, CLIENT_URL
npm run dev
```

Backend .env variables:
```bash
PORT=3333
DATABASE_URL=postgresql://user:password@host/neondb?sslmode=require
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

#### Frontend

```bash
cd frontend
npm install axios react-router-dom tailwindcss @tailwindcss/vite
# Create .env with VITE_API_URL
npm run dev
```

Frontend .env variables:
```bash
VITE_API_URL=http://localhost:1111
```

Frontend will be available at:
http://localhost:5173

---

## Project Structure

```
secure-notes/
├─ docker-compose.yml
├─ backend/
│  ├─ Dockerfile
│  ├─ config/db.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  └─ notes.js
│  ├─ middleware/protectMiddleware.js
│  └─ server.js
├─ frontend/
│  ├─ Dockerfile
│  ├─ src/
│  │  ├─ pages/
│  │  │  ├─ AccountPage.jsx
│  │  │  ├─ NotesPage.jsx
│  │  │  └─ WelcomePage.jsx
│  │  ├─ components/
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ AppRouter.jsx
│  │  │  └─ NoteModal.jsx
│  │  ├─ context/
│  │  │  ├─ AuthContext.jsx
│  │  │  └─ NotesContext.jsx
│  │  └─ utilities/api.js
```

---

## API Endpoints

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| GET    | /auth/me          | Get logged-in user info      |
| POST   | /auth/register    | Register a new user          |
| POST   | /auth/login       | Log in user                  |
| POST   | /auth/logout      | Logout user                  |
| GET    | /notes            | Get all notes of the user    |
| POST   | /notes            | Add a new note               |
| PUT    | /notes/:id        | Update a note                |
| DELETE | /notes/:id        | Delete a  note               |

---

## Author

**Taras Poiatsyka**\
[GitHub](https://github.com/tvsxar)
