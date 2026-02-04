# Dynamic Question & Response Management System

A full-stack **MERN application** developed as part of the technical assessment for the  
**MERN Developer position at Dhaka Apps Limited**.

This system allows **Admins** to dynamically create question sets and manage questions, while **Users** can take tests and submit responses. All submissions are securely stored and can be reviewed in detail by the admin.

---

## 🔗 Live Demo

- **Frontend (User Interface):**  
  https://q-and-a-management-system.netlify.app/login

- **Backend (REST API):**  
  https://q-and-a-management.vercel.app/

---

## 🎯 Project Objective

To build a web-based system where:

- Admins can create and manage different types of questions dynamically
- Users can view available tests, answer questions, and submit responses
- All responses are stored in the database and can be reviewed later in detail

---

## 🧰 Technology Stack

### Frontend

- React.js (Vite)
- React Router DOM
- Context API
- Tailwind CSS

### Backend

- Node.js
- Express.js
- RESTful APIs

### Database

- MongoDB (Mongoose)

### Authentication

- JWT (JSON Web Token)
- Role-based access control (Admin / User)

---

## ✨ Features

### Admin Features

- Register and login as Admin
- Create, update, and delete Question Sets
- Add and manage questions dynamically:
  - Multiple Choice Questions (MCQ)
  - True / False
  - Descriptive (Long Answer)
- View all user submissions
- View detailed responses for each submission (question-wise answers)

### User Features

- Register and login as User
- View available question sets
- Take tests with dynamically rendered inputs based on question type
- Form validation for required questions
- Submit responses successfully
- View submission success confirmation

---

## 🧠 Supported Question Types

| Type         | Description                                   |
| ------------ | --------------------------------------------- |
| MCQ          | Multiple options with optional correct answer |
| True / False | Boolean choice                                |
| Descriptive  | Long text answer                              |

---

## 📁 Project Structure

```text
Dynamic-Question-Response-System/
├── Q-and-A-management-server/
│   ├── controllers/      # Controller functions
│   ├── models/           # Database schemas (Mongoose)
│   ├── routes/           # API routes
│   ├── middlewares/      # Authentication & role protection
│   ├── config/           # Database connection setup
│   ├── app.js            # Express app configuration
│   └── server.js         # Server entry point
│
├── Q-and-A-management-client/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages (Admin / User)
│   │   ├── context/      # Context API (Auth state)
│   │   ├── config/       # API base URL configuration
│   │   └── main.jsx      # Main entry file
│   └── index.html
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### ⚙️ Environment Variables

Create a `.env` file in the backend directory (`Q-and-A-management-server/`) and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

⚠️ **Important:** Never push your `.env` file to GitHub.

---

## 📖 Installation & Setup

### Backend Setup

```bash
# Navigate to backend directory
cd Q-and-A-management-server

# Install dependencies
npm install

# Create .env file with MongoDB URI and JWT Secret
# (see Environment Variables section above)

# Start development server
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd Q-and-A-management-client

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

---

## ✅ User Guide

### Admin Workflow

1. **Register & Login** - Create admin account
2. **Create Question Set** - Add a new test/question set
3. **Manage Questions** - Add MCQ, True/False, or Descriptive questions
4. **Review Submissions** - View all user responses
5. **View Details** - Check question-wise answers for each submission

### User Workflow

1. **Register & Login** - Create user account
2. **Browse Tests** - View available question sets
3. **Take Test** - Answer questions based on their type
4. **Submit Responses** - Submit all answers
5. **Confirmation** - View submission success message

---

## 📝 API Documentation

Refer to the backend README for detailed API endpoint documentation and request/response examples.

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements.

---

## 📄 License

This project is open source and available under the MIT License.
