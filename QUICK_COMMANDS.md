# ⚡ Quick Commands Reference

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend (new terminal)
cd client
npm install
```

### 2. Setup Environment Variables
```bash
# Copy example files
cd server
copy .env.example .env
# Edit server/.env with your values

cd ../client
copy .env.example .env
# Edit client/.env with your values
```

### 3. Run Development
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Open http://localhost:5173 🎉

---

## 📝 Common Commands

### Backend Commands
```bash
cd server

# Development
npm run dev          # Run with nodemon (auto-reload)
npm start            # Production mode

# Testing
node index.js        # Direct run
```

### Frontend Commands
```bash
cd client

# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🔧 Utility Commands

### Check MongoDB Connection
```bash
cd server
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected')).catch(err => console.log('❌ Error:', err));"
```

### Kill Process on Port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

---

## 🌐 Deployment Commands

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy backend
cd server
vercel

# Deploy frontend
cd client
vercel --prod
```

---

## 🐛 Debugging Commands

### View Logs
```bash
# Backend logs
cd server
npm run dev  # Watch console

# Frontend logs
cd client
npm run dev  # Watch console + browser dev tools
```

### Clear Cache
```bash
# Clear node_modules
rm -rf node_modules
npm install

# Clear build
rm -rf dist
npm run build
```

---

## 📦 Package Management

### Add New Package
```bash
# Backend
cd server
npm install package-name

# Frontend
cd client
npm install package-name
```

### Update Packages
```bash
npm update
```

---

## 🔐 Environment Variables Quick Reference

### Server `.env`
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### Client `.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-client-id
```

---

## ✅ Quick Health Checks

```bash
# 1. Backend running?
curl http://localhost:5000/api/health

# 2. Frontend running?
# Open: http://localhost:5173

# 3. MongoDB connected?
# Check backend terminal for: "✅ MongoDB Connected"

# 4. Can login?
# Go to /login and try Google OAuth
```

---

## 🎯 Development Workflow

```bash
# Day 1: Initial setup
1. cd server && npm install
2. cd client && npm install
3. Setup .env files
4. npm run dev (both)

# Day 2+: Development
1. npm run dev (if not running)
2. Make changes
3. Test in browser
4. Git commit
```

---

## 📊 Git Commands

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"

# Daily workflow
git add .
git commit -m "Description of changes"
git push

# Create GitHub repo
git remote add origin https://github.com/USER/REPO.git
git branch -M main
git push -u origin main
```

---

## 🔄 Reset Everything

```bash
# Nuclear option - start fresh
rm -rf node_modules
rm -rf dist
rm package-lock.json
npm install
npm run dev
```

---

## 💡 Pro Tips

1. **Always run backend first**, then frontend
2. **Check backend logs** if frontend has issues
3. **Clear browser cache** if auth not working
4. **Check .env files** for typos
5. **Use Postman** to test API endpoints
6. **MongoDB Compass** to view database

---

## 🆘 Emergency Fixes

### Issue: Can't connect to MongoDB
```bash
# Check connection string
echo $MONGODB_URI

# Test connection
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('OK')).catch(console.error);"
```

### Issue: Google OAuth not working
```bash
# Check redirect URI in Google Console
# Must exactly match: http://localhost:5000/api/auth/google/callback

# Check client ID in both:
# - server/.env
# - client/.env
```

### Issue: CORS errors
```bash
# Check CLIENT_URL in server/.env
# Must match: http://localhost:5173
```

---

## 🎉 Success!

If all commands work, you're ready to develop! 🚀
