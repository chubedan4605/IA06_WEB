Đây là phiên bản **README.md** hoàn chỉnh, chuyên nghiệp, cập nhật đầy đủ các tính năng mới nhất mà bạn đã làm (Axios Interceptor, CORS, Environment Variables, Refresh Token Flow).

Bạn hãy tạo file `README.md` ở thư mục gốc và dán nội dung này vào:

````markdown
# IA03 – Advanced Authentication System (JWT)

A full-stack authentication system built with **NestJS** and **React**. It implements a secure **JWT** authentication flow using Access Tokens (short-lived) and Refresh Tokens (long-lived), handled automatically via Axios Interceptors.

---

## 🚀 Live Demo

| Component             | URL                             |
| --------------------- | ------------------------------- |
| **Frontend** (Vercel) | [REPLACE_WITH_YOUR_VERCEL_LINK] |
| **Backend** (Render)  | [REPLACE_WITH_YOUR_RENDER_LINK] |

---

## 🛠 Tech Stack

### Backend (NestJS)

- **Framework:** NestJS
- **Database:** MongoDB (Mongoose)
- **Security:** Bcrypt (Password Hashing), Passport-JWT
- **Features:** CORS Configuration, Environment Variables, DTO Validation.

### Frontend (React + Vite)

- **State Management:** React Query (TanStack Query)
- **Forms:** React Hook Form
- **HTTP Client:** Axios (Custom Interceptors for auto-refresh)
- **UI:** Tailwind CSS, Sonner (Toast Notifications).

---

## ⚙️ Installation & Local Setup

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` root and configure:

   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster... (Your MongoDB Atlas URL)
   JWT_SECRET=your_super_long_random_secret_string
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm run start:dev
   ```
   _Server running at: `http://localhost:3000`_

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` root:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the application:
   ```bash
   npm run dev
   ```
   _App running at: `http://localhost:5173`_

---

## 🔐 Authentication Flow & API Endpoints

The system implements the following secure flow:

### 1. Public Endpoints

- **POST** `/user/register`: Create a new account.
- **POST** `/user/login`: Authenticate user.
  - **Returns:** `{ accessToken, refreshToken, user }`
  - Frontend stores tokens in `localStorage`.

### 2. Protected Endpoints

- **GET** `/user/profile`: Get user details.
  - **Requires:** `Authorization: Bearer <accessToken>` header.

### 3. Token Refresh Mechanism (Automatic)

- **POST** `/user/refresh`: Generate new Access Token.
  - **Payload:** `{ "refreshToken": "..." }`
  - **Logic:** When Axios detects a `401 Unauthorized` error, it pauses requests, calls this endpoint to get a new token, updates the header, and retries the original request seamlessly.

---

## 📂 Project Structure

```
root
├── backend/                # NestJS Server
│   ├── src/
│   │   ├── user/           # User Module (Controller, Service, Schema)
│   │   ├── main.ts         # App Entry (CORS & Port config)
│   │   └── app.module.ts   # Config Module Setup
│   └── .env                # Backend Secrets
│
└── frontend/               # React Client
    ├── src/
    │   ├── api/axiosClient.js  # Axios Interceptor Logic
    │   ├── pages/              # Login, Register, Home
    │   ├── components/         # ProtectedRoute
    │   └── App.jsx             # Routing & React Query Setup
    └── .env                    # Frontend Config
```

---

## ⚠️ Deployment Notes

- **Backend (Render):** Ensure you add `MONGO_URI`, `JWT_SECRET`, and `ALLOWED_ORIGINS` in the Environment Variables settings.
- **Frontend (Vercel):** Ensure you add `VITE_API_URL` pointing to your Render backend URL (without trailing slash).
- **Database:** Ensure MongoDB Atlas Network Access allows `0.0.0.0/0` (Access from Anywhere).
