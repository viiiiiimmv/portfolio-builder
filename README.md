# 🧰 Developer Portfolio Builder (MERN Stack)

A full-stack CMS-style web application that allows developers to create, edit, and publish their own personal portfolios. Built with the MERN stack: MongoDB, Express.js, React.js, and Node.js.

## 🔗 Live Demo

**Frontend:** [Vercel Link Coming Soon]  
**Backend API:** [Render Link Coming Soon]  

---

## 🗂️ Project Structure

```
developer-portfolio-builder/
├── backend/        # Express.js + MongoDB REST API
├── frontend/       # React.js + Tailwind CSS frontend
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB
- npm / yarn

---

## 📁 Backend Setup (`/backend`)

### 🔧 Installation
```bash
cd backend
npm install
```

### ⚙️ Environment Variables
Create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### ▶️ Run Server
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

---

## 🎨 Frontend Setup (`/frontend`)

### 🔧 Installation
```bash
cd frontend
npm install
```

### ⚙️ Environment Variables
Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

### ▶️ Run React App
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

---

## ✨ Features

- 👤 User Authentication (JWT)
- ✍️ CMS Dashboard to edit sections:
  - About Me
  - Skills
  - Projects
  - Experience / Education
  - Contact Info
- 🌐 Public Portfolio URL: `/portfolio/:username`
- 🎨 Light/Dark theme toggle
- 💾 Data stored in MongoDB
- 📱 Responsive Design

---

## 👥 Contributing

This is a two-person collaborative project. Follow these steps:

1. Create feature branches (`frontend-dev`, `backend-dev`)
2. Push changes to respective branches
3. Open PRs to merge into `main`

---

## 📄 License

MIT License. Feel free to fork and customize.
