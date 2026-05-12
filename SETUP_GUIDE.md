# 📖 Complete Setup Guide - MERN Issue Tracker

## 🎯 Step-by-Step Setup

### Step 1: Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

---

### Step 2: MongoDB Atlas Setup

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Generate secure password (save it!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access From Anywhere" (0.0.0.0/0)
   - For production, use specific IPs
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `issuetracker`
   
   Example:
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/issuetracker?retryWrites=true&w=majority
   ```

---

### Step 3: Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit https://console.cloud.google.com/

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Name: "Issue Tracker"
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click and then "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Configure consent screen if asked:
     - User Type: External
     - App name: Issue Tracker
     - User support email: your email
     - Developer contact: your email
     - Save and Continue through all steps

5. **Configure OAuth Client**
   - Application type: Web application
   - Name: Issue Tracker
   - Authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - `https://your-production-url.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (development)
     - `https://your-api-url.com/api/auth/google/callback` (production)
   - Click "Create"
   
6. **Copy Credentials**
   - Save Client ID
   - Save Client Secret

---

### Step 4: Environment Variables

#### Server `.env` (create in `server` folder)
```env
# MongoDB
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/issuetracker?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
CLIENT_URL=http://localhost:5173
```

#### Client `.env` (create in `client` folder)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

---

### Step 5: Run the Application

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
✅ Server running on port 5000 in development mode
```

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 6: Test the Application

1. Open browser: `http://localhost:5173`
2. Click "Login"
3. Click "Continue with Google"
4. Select your Google account
5. You should be redirected to Dashboard

---

## 🚨 Troubleshooting

### MongoDB Connection Issues
**Error:** "Can't reach database server"
- Check internet connection
- Verify connection string is correct
- Ensure IP is whitelisted (0.0.0.0/0)
- Check database user credentials

### Google OAuth Issues
**Error:** "redirect_uri_mismatch"
- Verify redirect URI in Google Console exactly matches
- Check protocol (http vs https)
- Restart backend after changing .env

### Port Already in Use
**Error:** "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### CORS Errors
- Verify CLIENT_URL in server/.env matches frontend URL
- Check CORS configuration in server/index.js

---

## ✅ Success Checklist

- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string copied
- [ ] Google Cloud project created
- [ ] OAuth credentials created
- [ ] Redirect URIs configured
- [ ] Server `.env` created with all variables
- [ ] Client `.env` created with all variables
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend running successfully
- [ ] Frontend running successfully
- [ ] Can login with Google
- [ ] Can create an issue
- [ ] Can view issues on dashboard

---

## 🎉 You're All Set!

Now you can:
- ✅ Create issues
- ✅ Edit issues
- ✅ Delete issues
- ✅ Assign issues to users
- ✅ Filter by status
- ✅ View dashboard with charts

## 📚 Next Steps

1. Read the README for deployment instructions
2. Customize the UI as needed
3. Add more features
4. Deploy to production

Need help? Check the troubleshooting section or review the code!
