# NovaHaven

**A legendary city where ancient magic powers futuristic technology, and heroes rise to protect the balance between light and darkness.**

NovaHaven is a full-stack web application built with React, TypeScript, Express.js, and MongoDB. It features an immersive fantasy-sci-fi universe with comic books, character profiles, lore, and a community forum for fans to connect and share.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [FAQ](#faq)

---

## 🌟 Project Overview

NovaHaven is a fantasy-sci-fi world where magic and technology coexist. The platform allows users to:

- **Explore the Universe**: Learn the history and lore of NovaHaven through rich narrative content
- **Discover Characters**: Meet heroes and villains that shape the world
- **Read Comics**: Experience epic stories through interactive comic chapters with visual imagery
- **Understand Magic & Tech**: Delve into the unique blend of ancient magic and futuristic technology
- **Join the Community**: Connect with other fans in the forum (requires authentication)
- **Manage Content**: Admin dashboard for uploading comics and moderating forum posts

---

## ✨ Key Features

### Public Pages
- **Home**: Hero landing page introducing the NovaHaven universe with Call-to-Action buttons
- **History**: Narrative-driven timeline of NovaHaven's creation and evolution
- **Magic & Tech**: Explanation of how magic and technology blend in the world
- **Characters**: Character gallery with hero and villain profiles
- **Comic Book**: Interactive comic reader with chapter selection and page navigation

### Authentication System
- **User Registration**: Create a new account with username, email, and password
- **User Login**: Secure authentication with JWT token storage
- **Protected Routes**: Forum and Admin Dashboard are only accessible to authenticated users

### Community Features
- **Forum**: Post discussions, share theories, and connect with other fans (protected)
- **Admin Dashboard**: 
  - Upload new comic chapters with images and descriptions
  - Moderate forum posts (delete spam/inappropriate content)
  - View real-time statistics (community members, forum posts, comic chapters)

### Data Management
- **Comics API**: Full CRUD operations for comic chapters
- **Forum API**: Create, read, and delete forum posts
- **Auth API**: Register and login functionality with password hashing

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Vite** - Fast build tool
- **Axios** - HTTP client for API calls
- **ESLint** - Code quality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **MongoDB** - NoSQL database
- **JWT (jsonwebtoken)** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### DevOps
- **Python venv** - Python virtual environment (in project root)

---

## 📁 Project Structure

```
NovaHaven/
├── client/                       # React TypeScript frontend
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/                # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── History.tsx
│   │   │   ├── MagicTech.tsx
│   │   │   ├── Characters.tsx
│   │   │   ├── ComicBook.tsx
│   │   │   ├── Forum.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── auth/
│   │   │       ├── Login.tsx
│   │   │       └── Register.tsx
│   │   ├── styles/               # Global CSS
│   │   ├── api.ts                # Axios instance for API calls
│   │   ├── App.tsx               # Main app with routes
│   │   └── main.tsx              # React entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                       # Express.js backend
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register, login)
│   │   ├── comicController.js    # Comic CRUD operations
│   │   └── forumController.js    # Forum post CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── user.js               # User schema
│   │   ├── comic.js              # Comic schema
│   │   └── post.js               # Forum post schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth endpoints
│   │   ├── comicRoutes.js        # /api/comics endpoints
│   │   └── forumRoutes.js        # /api/forum endpoints
│   ├── server.js                 # Express app setup
│   ├── .env                      # Environment variables
│   └── package.json
│
├── character/                    # Character images
├── img/                          # Hero and promotional images
├── venv/                         # Python virtual environment
└── README.md                     # This file

```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16+) and **npm**
- **Python 3.8+** (for venv)
- **MongoDB** (local or Atlas connection)

### 1. Clone the Repository
```bash
cd NovaHaven
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create or update `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/novahaven
JWT_SECRET=your_jwt_secret_here
```

**Note**: If MongoDB is not installed locally, the app runs with an in-memory fallback for auth endpoints.

### 3. Setup Frontend

```bash
cd ../client
npm install
```

### 4. Setup Python Environment (Optional)

```bash
cd ..
.\venv\Scripts\Activate.ps1  # On Windows
source venv/bin/activate      # On macOS/Linux
```

---

## ▶️ Running the Application

### Start the Backend Server

```bash
cd server
npm start
```

The server runs on **http://localhost:5000**

```
Server running on port 5000
MongoDB connection failed: [if not running locally]
API endpoints ready:
- /api/auth/register
- /api/auth/login
- /api/comics
- /api/forum
```

### Start the Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

The app runs on **http://localhost:5173**

### Build for Production

```bash
cd client
npm run build
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "heroname",
  "email": "hero@novahaven.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "_id": "user_id",
  "username": "heroname",
  "email": "hero@novahaven.com"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "hero@novahaven.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "username": "heroname",
    "email": "hero@novahaven.com"
  }
}
```

### Comics Endpoints

#### Create Comic Chapter
```http
POST /api/comics
Content-Type: application/json

{
  "chapterNumber": 1,
  "title": "The Beginning",
  "description": "The origin of NovaHaven",
  "pages": [
    {
      "imageUrl": "https://example.com/page1.jpg",
      "pageNumber": 1
    }
  ]
}
```

#### Get All Comics
```http
GET /api/comics
```

#### Get Single Comic
```http
GET /api/comics/:id
```

#### Delete Comic
```http
DELETE /api/comics/:id
```

### Forum Endpoints

#### Create Post
```http
POST /api/forum
Content-Type: application/json

{
  "title": "Best Character?",
  "content": "Who is your favorite NovaHaven character?",
  "author": "heroname"
}
```

#### Get All Posts
```http
GET /api/forum
```

#### Delete Post
```http
DELETE /api/forum/:id
```

---

## ❓ FAQ

### General Questions

**Q1: What is NovaHaven?**
A: NovaHaven is a fantasy-sci-fi universe where magic and technology coexist. It's both a narrative world and a community platform for fans to explore characters, read comics, learn lore, and connect with others.

**Q2: Do I need an account to view content?**
A: No! Most content (History, Characters, Comics, Magic & Tech) is public. Only the Forum and Admin Dashboard require authentication.

**Q3: How do I join the community?**
A: Click "Register" on the login page, create an account with your username, email, and password, then log in to access the forum and connect with other fans.

---

### Setup & Installation

**Q4: I don't have MongoDB installed. Can I still run the app?**
A: Yes! The backend has an in-memory fallback. Authentication (register/login) will work, but data won't persist. For permanent storage, install MongoDB locally or use MongoDB Atlas.

**Q5: How do I install MongoDB?**
A: 
- **Windows**: Download from [mongodb.com](https://www.mongodb.com/try/download/community) and run the installer
- **macOS**: `brew install mongodb-community`
- **Linux**: Follow official MongoDB installation docs

**Q6: What's the purpose of the Python venv?**
A: The virtual environment is set up for future Python-based tools or scripts that might be added to the project (e.g., data processing, machine learning, or backend utilities).

---

### Authentication & Security

**Q7: How is my password stored?**
A: Passwords are hashed using bcrypt with 10 salt rounds before storage. Raw passwords are never saved to the database.

**Q8: What happens after I login?**
A: Your JWT token is saved to browser `localStorage`. The token is sent with subsequent requests to authenticate you. Logging in redirects you to the forum.

**Q9: How do I logout?**
A: Clear your browser's localStorage or close your browser session. (Logout feature coming soon!)

**Q10: What does the "Protected Route" component do?**
A: It checks if a JWT token exists in localStorage. If not, it redirects unauthenticated users to the login page.

---

### Admin & Content Management

**Q11: How do I access the Admin Dashboard?**
A: Navigate to `/admin` after logging in. Only authenticated users can access it.

**Q12: Can I upload comic chapters?**
A: Yes, from the Admin Dashboard. Fill in the chapter number, title, description, and image URL, then click "Upload Chapter."

**Q13: How do I moderate forum posts?**
A: The Admin Dashboard displays all forum posts. Click "Delete Post" to remove inappropriate or spam content.

**Q14: Can I edit a comic chapter after uploading?**
A: Currently, you can only delete and re-upload. Full edit functionality coming in future updates.

---

### Technical Questions

**Q15: What's the difference between `api.ts` and the API routes?**
A: `api.ts` is the frontend Axios instance that configures the base URL and makes HTTP requests. The routes (in `/server/routes/`) define the backend API endpoints that handle requests.

**Q16: How do I add a new page to the website?**
A:
1. Create a new `.tsx` file in `client/src/pages/`
2. Import it in `App.tsx`
3. Add a new `<Route>` in the router

**Q17: How do I run the application in production?**
A:
```bash
cd client && npm run build  # Creates optimized dist/ folder
cd ../server && npm start    # Starts backend on port 5000
# Serve client/dist/ using a static file server or deploy to hosting
```

**Q18: Can I change the server port?**
A: Yes, update the `PORT` variable in `server/.env`. Update the frontend's `api.ts` baseURL accordingly.

---

### Troubleshooting

**Q19: I'm getting "Cannot find module" errors**
A: 
- Run `npm install` in both `client/` and `server/` folders
- Delete `node_modules/` and `package-lock.json`, then reinstall
- Ensure you're in the correct directory when running commands

**Q20: Login/Register isn't working**
A:
- Verify the backend is running (`npm start` in `server/`)
- Check that the API URL in `client/src/api.ts` matches your backend URL
- Open browser DevTools → Network tab to see the API request
- Check the terminal for backend error logs

**Q21: Styled components look broken**
A:
- Ensure `client/src/styles/global.css` exists and is imported in `main.tsx`
- Check browser console for CSS errors
- Clear browser cache (Ctrl+Shift+Delete)

**Q22: TypeScript compilation errors**
A:
- Run `npm run build` to see all errors
- Check that imported components/types exist
- Ensure file extensions are `.tsx` for React files and `.ts` for utilities
- Run `tsc --noEmit` to check types without building

---

### Feature Requests & Future Updates

**Q23: What features are coming soon?**
A: 
- User profile pages
- Comment threads on forum posts
- Comic bookmarks/favorites
- Email notifications
- Dark mode theme
- Mobile app version

**Q24: How can I contribute to NovaHaven?**
A: Reach out to the development team with feature ideas, bug reports, or design suggestions!

---

## 📝 License

NovaHaven © 2026. All rights reserved.

---

## 🤝 Support

For questions, issues, or feature requests, contact the development team or open an issue in the project repository.

**Welcome to NovaHaven, hero. The balance between magic and technology awaits your discovery.** ✨
