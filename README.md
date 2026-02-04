# Dynamic Question & Response Management System

A full-stack MERN application developed as part of the technical assessment for the **MERN Developer position at Dhaka Apps Limited**.  
This system allows administrators to dynamically create question sets and manage questions, while users can take tests and submit responses. All submissions can later be reviewed in detail by the admin.

---

## 🔗 Live Demo

- **Frontend (User Interface):**  
  https://q-and-a-management-system.netlify.app/login

- **Backend (REST API):**  
  https://q-and-a-management.vercel.app/

---

## 🎯 Project Objective

To build a web-based system where:
- Admins can create and manage different types of questions dynamically.
- Users can view available tests, answer questions, and submit responses.
- All responses are stored securely and can be reviewed later by the admin.

---

## 🧰 Technology Stack

**Frontend**
- React.js (Vite)
- React Router DOM
- Context API
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- RESTful APIs

**Database**
- MongoDB (Mongoose)

**Authentication**
- JWT (JSON Web Token)
- Role-based access (Admin / User)

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

## 🧠 Question Types Supported

| Type | Description |
|----|----|
| MCQ | Multiple options with optional correct answer |
| True / False | Boolean choice |
| Descriptive | Long text answer |

---

## 📁 Project Structure

```text
Dynamic-Question-Response-System/
├── Q-and-A-management-server/
│   ├── controllers/      # হ্যান্ডলার ফাংশনসমূহ
│   ├── models/           # ডাটাবেস স্কিমা (Mongoose)
│   ├── routes/           # API রাউটসমূহ
│   ├── middlewares/      # অথেন্টিকেশন ও অন্যান্য মিডলওয়্যার
│   ├── config/           # ডাটাবেস কানেকশন সেটআপ
│   ├── app.js            # এক্সপ্রেস অ্যাপ কনফিগারেশন
│   └── server.js         # সার্ভার এন্ট্রি পয়েন্ট
│
├── Q-and-A-management-client/
│   ├── src/
│   │   ├── components/   # রিইউজেবল UI কম্পোনেন্ট
│   │   ├── pages/        # অ্যাপের পেজসমূহ (Admin/User)
│   │   ├── context/      # স্টেট ম্যানেজমেন্ট (Auth Context)
│   │   ├── config/       # API বেস URL ও কনফিগ
│   │   └── main.jsx      # মেইন এন্ট্রি ফাইল
│   └── index.html
│
└── README.md




---

## ⚙️ Environment Variables

Create a `.env` file in the **backend root directory** with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret




## 🚀 How to Run the Project Locally

### Backend Setup

1. সার্ভার ফোল্ডারে প্রবেশ করুন:
cd Q-and-A-management-server

2. প্রয়োজনীয় প্যাকেজ ইন্সটল করুন:
npm install

3. এনভায়রনমেন্ট ভেরিয়েবল (.env) ফাইল তৈরি করে তাতে MongoDB URI এবং JWT Secret যুক্ত করুন।

4. সার্ভার চালু করুন:
npm run dev

সার্ভার ইউআরএল: http://localhost:5000

---

### Frontend Setup

1. ক্লায়েন্ট ফোল্ডারে প্রবেশ করুন:
cd Q-and-A-management-client

2. প্রয়োজনীয় প্যাকেজ ইন্সটল করুন:
npm install

3. ক্লায়েন্ট সাইড চালু করুন:
npm run dev

ক্লায়েন্ট ইউআরএল: http://localhost:5173