````markdown
# IA03 – User Registration System

This is a full-stack User Registration System built with **NestJS** (Backend) and **React + Vite** (Frontend). It features user registration, login, validation, password hashing, and MongoDB integration.

## 🚀 Live Demo

- **Frontend (Vercel):** [https://ia06-web-23120279.vercel.app/]
- **Backend (Render):** [https://ia06-web-1.onrender.com]

---

## 🛠 Tech Stack

- **Backend:** NestJS, Mongoose, MongoDB, Bcrypt, Class-Validator.
- **Frontend:** React, Vite, Tailwind CSS, React Hook Form, React Query (TanStack Query), Axios.

---

## ⚙️ Installation & Local Setup

Prerequisites:

- Node.js installed.
- A MongoDB connection string (MongoDB Atlas).

### 1. Backend Setup (NestJS)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` root folder and add your MongoDB connection string:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/mydb
   ```

4. Start the server:
   ```bash
   npm run start:dev
   ```
   > The backend server will run at: `http://localhost:3000`

---

### 2. Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` root folder to configure the API endpoint:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the application:
   ```bash
   npm run dev
   ```
   > The frontend will run at: `http://localhost:5173`

---

## 🧪 How to Test

1. Ensure both Backend (port 3000) and Frontend (port 5173) are running.
2. Go to `http://localhost:5173/register`.
3. Create a new account (Validation is applied).
4. You will be redirected to the Login page.
5. Log in with your new account.
6. Upon success, you will see the Home page with your user email.

---

## 📂 Project Structure

```
root
├── backend/          # NestJS Source Code
│   ├── src/
│   │   ├── user/     # User Module (Controller, Service, DTO, Schema)
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── .env          # Environment variables (DB Connection)
│
└── frontend/         # React Source Code
    ├── src/
    │   ├── pages/    # Login, Register, Home components
    │   └── App.jsx   # Routing setup
    └── .env          # Environment variables (API URL)
```
