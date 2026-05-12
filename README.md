# 🎯 MERN Issue Tracker

A full-stack issue tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure login with JWT
- 📊 **Dashboard** - Overview of all issues with charts and statistics
- ✏️ **CRUD Operations** - Create, read, update, and delete issues
- 👥 **Assign Issues** - Assign issues to team members
- 🎯 **Filter & Search** - Filter by status, assignee
- 📝 **Markdown Support** - Write descriptions in Markdown
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- React Query (TanStack Query)
- Radix UI Components
- Tailwind CSS
- Axios
- React Hook Form + Zod
- SimpleMDE (Markdown Editor)
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Google OAuth)
- JWT Authentication
- Express Validator

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)
- Google Cloud Console project (for OAuth)

## 🚀 Quick Start

### 1. Clone the repository
```bash
cd mern-issue-tracker
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file in `server` folder:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

Start backend server:
```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create `.env` file in `client` folder:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start frontend:
```bash
npm run dev
```

Visit `http://localhost:5173` 🎉

## 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:5000/api/auth/google/callback`
   - Production: `https://your-domain.com/api/auth/google/callback`
6. Copy Client ID and Client Secret to `.env` files

## 🗄️ MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get connection string and add to `.env`

## 🌐 Deployment

### Vercel Deployment (Recommended)

#### Deploy Backend
```bash
cd server
vercel
```

#### Deploy Frontend
```bash
cd client
npm run build
vercel
```

Set environment variables in Vercel dashboard for both projects.

## 📁 Project Structure

```
mern-issue-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   └── utils/         # Utilities
│   └── package.json
│
├── server/                # Express backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── package.json
│
└── README.md
```

## 🎨 Screenshots

- Dashboard with issue statistics
- Issue list with filters
- Create/Edit issue with Markdown editor
- Issue detail with assign and delete options

## 👨‍💻 Author

**Riyaz Pathan**
- Email: riyazpathan193.rp@gmail.com
- LinkedIn: [linkedin.com/in/riyazr2](https://www.linkedin.com/in/riyazr2/)
- GitHub: [github.com/RiyazR2](https://github.com/RiyazR2)

## 📄 License

MIT License - feel free to use this project for learning or your portfolio!
