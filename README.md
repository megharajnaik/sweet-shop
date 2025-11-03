# 🍬 Sweet Shop Management System

A full-stack web application to manage sweets in a confectionery store.  
Built with **FastAPI** (Python) for the backend and **React.js (Vite + Tailwind CSS)** for the frontend.  
Implements secure user authentication, CRUD operations for sweets, and a clean, responsive dashboard UI.

---

## Features

- **JWT Authentication** — Secure login and registration with hashed passwords.  
- **Sweet Management** — Add, edit, view, and delete sweets with quantity and price tracking.  
- **Modern UI** — Responsive React + Tailwind CSS design with a smooth user experience.  
- **RESTful API** — FastAPI-based backend with token-based authentication.  
- **Test-Driven Development (TDD)** — Includes backend unit tests following the Red-Green-Refactor pattern.  
- **MySQL Database** — Persistent data storage for users and sweets.  

---

## Tech Stack

### Backend
- **FastAPI** – Lightweight Python web framework  
- **SQLAlchemy** – ORM for database interaction  
- **MySQL** – Relational database  
- **Passlib & JWT** – Password hashing and authentication  
- **Pytest** – For backend unit tests  

### Frontend
- **React (Vite)** – Fast modern frontend tooling  
- **Tailwind CSS** – Utility-first CSS framework  
- **Axios** – API communication  
- **React Router DOM** – Client-side routing  

---

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL Server
- Git

---

### Backend Setup

1. **Navigate to backend folder**
   Create and activate virtual environment
   Install dependencies
   Set up the database
   Create a MySQL database (e.g., sweetshop)
   Update your connection string in .env or db.py:
   Run the backend server
   
   The API should be available at:
👉 http://127.0.0.1:8000

### Frontend Setup
   Navigate to frontend folder
   Install dependencies
   Run the app
    
   Access the frontend at:
👉 http://localhost:5173/


📁 Project Structure

sweet-shop/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── tests/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SweetManager.jsx
│   │   └── Dashboard.jsx
│   ├── App.css
│   ├── styles.css
│   └── vite.config.js
│
└── README.md

## Screenshots
### Login Page
<img width="1705" height="548" alt="Screenshot 2025-11-03 115958" src="https://github.com/user-attachments/assets/d46b23c3-667a-4e98-9e75-2897dcd27225" />
### Register page
<img width="1577" height="583" alt="Screenshot 2025-11-03 115937" src="https://github.com/user-attachments/assets/b32b76c7-99bb-4ff3-b003-a3d082a36793" />
### Dashboard
<img width="1608" height="738" alt="Screenshot 2025-11-03 120042" src="https://github.com/user-attachments/assets/bf70a267-4ed0-4e8e-b7d0-5015b0d18ce2" />
<img width="1445" height="741" alt="Screenshot 2025-11-03 120054" src="https://github.com/user-attachments/assets/1f079ca2-dd91-4b8e-aa84-56ed8c040088" />

### Back end
<img width="1883" height="1028" alt="image" src="https://github.com/user-attachments/assets/b8072ce7-306e-4076-b3a4-54e398f8b28b" />


## My AI Usage
This project was built with assistance from AI tools to accelerate development and ensure high-quality results.

## Tools Used
ChatGPT (GPT-5) — Used extensively for:
Designing REST API routes and request/response schemas.
Writing and debugging backend logic for authentication and CRUD operations.
Generating frontend React components (Login, Register, Dashboard).
Writing test cases for FastAPI endpoints.
Styling UI using Tailwind CSS.
GitHub Copilot — Used occasionally for small code suggestions during refactoring.

## How AI Was Used
Backend: ChatGPT was used to generate boilerplate for FastAPI routes, models, and schemas, followed by manual optimization and validation logic.
Frontend: ChatGPT suggested structure and styling for the React components, which were then customized for usability.
Testing: ChatGPT helped design unit tests for the API endpoints.

## Reflection
AI tools improved development speed by reducing boilerplate work and improving debugging efficiency.
However, all logic was verified, refined, and tested manually. The AI served as a pair-programming assistant, not a code generator.
This collaboration improved productivity and confidence in maintaining clean, structured, and testable code.

AI Co-Authorship:
For commits where AI was used

### Versioning:
v1 → Original implementation
main → Updated version with UI improvements, testing, and TDD alignment

