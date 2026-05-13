# 🏠 Local Development Reference Guide

This guide shows exactly how the MERN Issue Tracker looks and runs locally.

---

## 🖥️ Local Development URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:5173 | React app (Vite dev server) |
| **Backend** | http://localhost:5000 | Express API server |
| **API Health** | http://localhost:5000/api/health | Check if backend is running |

---

## 🚀 How to Run Locally (Step by Step)

### **1. Install Dependencies**

Open **TWO terminals** in the project root (`mern-issue-tracker`):

**Terminal 1 - Backend:**
```bash
cd server
npm install
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
```

---

### **2. Setup Environment Variables**

Create **two `.env` files** (copy from `.env.example`):

**File: `server/.env`**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/issuetracker
JWT_SECRET=your-secret-key-min-32-characters
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
PRODUCTION_URL=http://localhost:5173
```

**File: `client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

---

### **3. Start the Servers**

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Expected Output:**
```
✅ Server running on port 5000 in development mode
✅ MongoDB Connected: cluster-name.mongodb.net
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

**Expected Output:**
```
VITE v5.4.21  ready in 1653 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### **4. Open the Application**

Visit: **http://localhost:5173**

---

## 📸 What You'll See (Local UI Flow)

### **Page 1: Landing/Login Page**
- **URL:** `http://localhost:5173/`
- **Elements:**
  - Issue Tracker logo/title
  - "Login with Google" button
  - Simple, clean design

### **Page 2: Dashboard (After Login)**
- **URL:** `http://localhost:5173/dashboard`
- **Elements:**
  - Welcome message with user name
  - Issue statistics cards
  - Charts showing issue distribution
  - Latest issues list
  - Navigation: Dashboard | Issues | New Issue

### **Page 3: Issues List**
- **URL:** `http://localhost:5173/issues`
- **Elements:**
  - List of all issues
  - Filter by status (All, Open, In Progress, Closed)
  - Each issue shows:
    - Title
    - Status badge (colored)
    - Assignee (if any)
    - Created date

### **Page 4: Create New Issue**
- **URL:** `http://localhost:5173/issues/new`
- **Elements:**
  - **Title** input field (required)
  - **Description** markdown editor (required)
  - **Create Issue** button
  - **Cancel** button

### **Page 5: Issue Details**
- **URL:** `http://localhost:5173/issues/{id}`
- **Elements:**
  - Issue title
  - Status badge
  - Description (rendered markdown)
  - Created/Updated timestamps
  - **Right Sidebar:**
    - **Status dropdown** (Open/In Progress/Closed)
    - **Assignee dropdown** (assign to users)
    - **Edit Issue** button
    - **Delete Issue** button

### **Page 6: Edit Issue**
- **URL:** `http://localhost:5173/issues/edit/{id}`
- **Elements:**
  - Pre-filled title input
  - Pre-filled description markdown editor
  - **Update Issue** button
  - **Cancel** button

---

## ✅ Features You Can Test Locally

### **1. Authentication**
- ✅ Click "Login with Google"
- ✅ Select Google account
- ✅ Redirected to dashboard
- ✅ User name shown in navbar

### **2. Create Issue**
- ✅ Go to "New Issue"
- ✅ Enter title and description
- ✅ Click "Create Issue"
- ✅ See success toast
- ✅ Redirected to issue details

### **3. Change Status**
- ✅ Open any issue
- ✅ Click status dropdown (right sidebar)
- ✅ Select: Open / In Progress / Closed
- ✅ See color change (Red/Orange/Green)
- ✅ See success toast

### **4. Assign User**
- ✅ Open any issue
- ✅ Click assignee dropdown
- ✅ Select a user
- ✅ See success toast

### **5. Edit Issue**
- ✅ Open any issue
- ✅ Click "Edit Issue" button
- ✅ Modify title or description
- ✅ Click "Update Issue"
- ✅ See success toast

### **6. Delete Issue**
- ✅ Open any issue
- ✅ Click "Delete Issue" button
- ✅ Confirm deletion
- ✅ Redirected to issues list

---

## 🛑 How to Stop Servers

**Stop Backend:**
- Go to Terminal 1
- Press `Ctrl + C`

**Stop Frontend:**
- Go to Terminal 2
- Press `Ctrl + C`

---

## 🔍 Troubleshooting

### **Backend not starting?**
```bash
# Check MongoDB connection string in server/.env
# Make sure MongoDB Atlas IP whitelist includes your IP
# Verify Google OAuth credentials
```

### **Frontend showing errors?**
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

### **Google Login not working?**
- Check `GOOGLE_CLIENT_ID` matches in both `.env` files
- Verify authorized redirect URI in Google Console:
  - `http://localhost:5000/api/auth/google/callback`
- Verify authorized JavaScript origins:
  - `http://localhost:5173`
  - `http://localhost:5000`

---

## 📝 Development Checklist

Before pushing to GitHub, verify:

- [ ] Both servers start without errors
- [ ] Can login with Google
- [ ] Can create new issue
- [ ] Can edit issue
- [ ] Can delete issue
- [ ] Can change status
- [ ] Can assign user
- [ ] Dashboard shows statistics
- [ ] No console errors in browser
- [ ] `.env` files are NOT committed (check `.gitignore`)

---

## 🌐 Next Step: Deployment

Once everything works locally, follow: **DEPLOYMENT_GUIDE.md**

---

**Last Tested:** May 13, 2026  
**Working Environment:** Windows, Node.js v18+, MongoDB Atlas, Google OAuth
