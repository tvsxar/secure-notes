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

Try it online via our [Live Demo](https://secure-notes-frontend-1c59.onrender.com)!

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

---

## Architecture & Flow

1. React frontend sends HTTP requests to the backend API.  
2. Express.js backend receives requests and queries PostgreSQL.  
3. Backend returns JSON data.  
4. Frontend updates the UI and state based on API responses.  
5. Authentication is handled via JWT in cookies.  
6. Search and filtering of notes happen on the backend.  

---

## Installation & Run

### Backend

```bash
cd backend
npm install
npm i express pg cors dotenv
```

Create a `.env` file inside `backend/` with the following:

```env
PORT=3333
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5173
DB_NAME=your_db_name
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

> **Note for developers:**  
> For local development, uncomment the local pool configuration in `/db.js` and comment out the production one.  
> Make sure to fill in your own local database credentials.

---

### Frontend

```bash
cd frontend
npm install
npm i axios react-router-dom tailwindcss @tailwindcss/vite
```

Create a `.env` file inside `frontend/` with the following:

```env
VITE_API_URL=http://localhost:3333
```

```bash
npm run dev
```

Frontend will be available at:
http://localhost:5173

---

## Project Structure

```
secure-notes/
├─ backend/
│  ├─ config/db.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  └─ notes.js
│  ├─ middleware/protectMiddleware.js
│  └─ server.js
├─ frontend/
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