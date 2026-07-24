# 💰 Expense Tracker

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

A full-stack web application built with the MERN stack for tracking personal expenses. It allows users to register, log in, manage their expenses (including via natural-language AI parsing), set monthly budgets, and export their data as CSV/PDF reports. The app features a beautiful, responsive UI with seamless light and dark modes.

Demo Link: https://expense-tracker-rho-two-72.vercel.app/

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based user registration and login, plus a secure password reset flow via email.
- **🤖 AI-Powered Quick Add**: Describe an expense in plain language (e.g., "Spent ₹500 on pizza yesterday") and Google's Gemini AI instantly parses it into a structured draft for quick saving.
- **📊 Interactive Dashboard**: Visual representations of your expenses with dynamically scaling line charts, top category stats, and month-by-month filters.
- **🎯 Budget Tracking**: Set per-category and overall monthly spending limits. Get inline warnings when an expense will push you over budget.
- **📤 Export Data**: Download your expenses and budget status as a clean PDF report or a raw CSV file.
- **🎨 Modern UI/UX**: Built with React 19, Tailwind CSS v4, and Framer Motion. Fully responsive with a built-in Dark Mode that remembers your preference.
- **🖼️ Profile Customization**: Upload your own profile avatar (powered by ImageKit).

## 🖼️ Screenshots

<img width="1901" height="900" alt="image" src="https://github.com/user-attachments/assets/a2bc9b29-47a2-43f0-b94e-a44ace8d8cec" />
<img width="1907" height="901" alt="image" src="https://github.com/user-attachments/assets/bdba93f2-cd7f-42db-b98a-2bd904b17f65" />
<img width="1895" height="901" alt="image" src="https://github.com/user-attachments/assets/090fa503-860f-4ea9-93f3-3770ba6b6c40" />
<img width="1897" height="902" alt="image" src="https://github.com/user-attachments/assets/59249f71-f9b7-4b29-92e7-474025c24d6e" />
<img width="1895" height="900" alt="image" src="https://github.com/user-attachments/assets/8bd5d53f-4aaa-43b4-a80e-e2e3a9af0c8a" />
<img width="1892" height="895" alt="image" src="https://github.com/user-attachments/assets/5af22525-6ce0-4823-8777-6b6b9075272e" />

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router v7, Redux Toolkit, React Hook Form, Zod, Recharts, Framer Motion, Lucide React, jsPDF
- **Backend**: Node.js, Express.js 5
- **Database**: MongoDB (Mongoose ODM)
- **Services**: Google Gemini API (AI parsing), Brevo (transactional emails), ImageKit (avatar CDN)
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB account (or local instance)
- API Keys for Google Gemini, Brevo, and ImageKit

### 1. Clone the repository
```bash
git clone https://github.com/Ayush7433/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Install Dependencies
Install packages for both the client and server:
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash
BREVO_API_KEY=your_brevo_api_key
CLIENT_URL=http://localhost:5173
```
Create a `.env` file in the `client` directory:
```env
VITE_APP_API_URL=http://localhost:5000/api
```

### 4. Run the App Locally
Start the backend server (runs on port 5000):
```bash
cd server
npm run dev
```
In a new terminal, start the frontend client:
```bash
cd client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📁 Project Architecture

The project is split into a standard Client-Server model:
- `client/`: A Single Page Application (SPA) using React and Redux Toolkit.
- `server/`: A RESTful Express Node.js API connecting to MongoDB.

For detailed architecture, component breakdowns, and API documentation, please see the [PROJECT.md](./PROJECT.md) file.
