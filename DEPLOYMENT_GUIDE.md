# 🚀 Deployment Guide - Vercel

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at vercel.com)
- MongoDB Atlas database (already set up)
- Google OAuth credentials (already set up)

---

## 🌐 Deployment Strategy

We'll deploy:
1. **Backend** → Vercel Serverless Functions
2. **Frontend** → Vercel Static Site

---

## Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial MERN Issue Tracker"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/mern-issue-tracker.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Vercel

### 2.1 Import Project
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click on the repository

### 2.2 Configure Backend
1. **Root Directory:** Set to `server`
2. **Framework Preset:** Other
3. **Build Command:** Leave empty or `npm install`
4. **Output Directory:** Leave empty

### 2.3 Environment Variables
Add these in Vercel dashboard:

```
MONGODB_URI = mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/issuetracker?retryWrites=true&w=majority

JWT_SECRET = your-super-secret-jwt-key-min-32-characters-long

GOOGLE_CLIENT_ID = your-google-client-id.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET = your-google-client-secret

NODE_ENV = production

CLIENT_URL = https://your-frontend-url.vercel.app

PRODUCTION_URL = https://your-frontend-url.vercel.app
```

### 2.4 Deploy
- Click "Deploy"
- Wait for build to complete
- Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

---

## Step 3: Update Google OAuth

1. Go to Google Cloud Console
2. Navigate to "Credentials"
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized redirect URIs:**
   ```
   https://your-backend.vercel.app/api/auth/google/callback
   ```
5. Add to **Authorized JavaScript origins:**
   ```
   https://your-frontend.vercel.app
   ```
6. Save

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Import Project Again
1. In Vercel dashboard, click "Add New" → "Project"
2. Select same repository
3. This time configure for frontend

### 4.2 Configure Frontend
1. **Root Directory:** Set to `client`
2. **Framework Preset:** Vite
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

### 4.3 Environment Variables
Add these:

```
VITE_API_URL = https://your-backend.vercel.app/api

VITE_GOOGLE_CLIENT_ID = your-google-client-id.apps.googleusercontent.com
```

### 4.4 Deploy
- Click "Deploy"
- Wait for build
- Copy the frontend URL

---

## Step 5: Update Backend Environment

1. Go to backend project in Vercel
2. Settings → Environment Variables
3. Update:
   ```
   CLIENT_URL = https://your-frontend.vercel.app
   PRODUCTION_URL = https://your-frontend.vercel.app
   ```
4. Redeploy backend (Deployments → Latest → Redeploy)

---

## Step 6: Test Production

1. Visit your frontend URL
2. Click "Login with Google"
3. Authenticate
4. Create an issue
5. Test all features

---

## 🎯 Custom Domain (Optional)

### Add Custom Domain to Frontend
1. Go to frontend project in Vercel
2. Settings → Domains
3. Add your domain (e.g., `issuetracker.com`)
4. Follow DNS setup instructions
5. Update environment variables:
   - Backend `CLIENT_URL` → `https://issuetracker.com`
   - Google OAuth redirect URI → `https://api.issuetracker.com/api/auth/google/callback`

### Add Custom Domain to Backend
1. Go to backend project
2. Settings → Domains
3. Add subdomain (e.g., `api.issuetracker.com`)
4. Update:
   - Frontend `VITE_API_URL` → `https://api.issuetracker.com/api`

---

## ⚠️ Important Production Checklist

- [ ] MongoDB IP whitelist includes 0.0.0.0/0 (or Vercel IPs)
- [ ] All environment variables set in Vercel
- [ ] Google OAuth redirect URIs updated with production URLs
- [ ] Backend CLIENT_URL points to frontend
- [ ] Frontend API_URL points to backend
- [ ] JWT_SECRET is strong and secure
- [ ] Test login functionality
- [ ] Test create/edit/delete issues
- [ ] Test assign feature
- [ ] Check responsive design on mobile

---

## 🐛 Troubleshooting Production Issues

### Issue: "Cannot connect to database"
- Check MongoDB IP whitelist
- Verify MONGODB_URI in Vercel environment variables
- Check Vercel function logs

### Issue: "OAuth redirect_uri_mismatch"
- Verify exact redirect URI in Google Console
- Must match: `https://your-backend.vercel.app/api/auth/google/callback`
- Check for trailing slashes

### Issue: "CORS errors"
- Check CLIENT_URL in backend environment variables
- Verify it matches your frontend URL exactly
- Redeploy backend after changes

### Issue: "JWT token invalid"
- Ensure JWT_SECRET is same across all deployments
- Clear browser localStorage
- Login again

---

## 📊 Monitoring

### View Logs
1. Go to project in Vercel
2. Click on deployment
3. Click "Functions" tab
4. View function logs

### Check Analytics
- Vercel provides built-in analytics
- Monitor API response times
- Check error rates

---

## 🔄 Continuous Deployment

Vercel auto-deploys on:
- Push to main branch → Production
- Pull requests → Preview deployments

To redeploy manually:
1. Go to Deployments
2. Click latest deployment
3. Click "Redeploy"

---

## ✅ Success!

Your MERN Issue Tracker is now live! 🎉

**URLs to share:**
- Frontend: https://your-frontend.vercel.app
- Backend API: https://your-backend.vercel.app/api
- Dashboard: https://your-frontend.vercel.app
- Health Check: https://your-backend.vercel.app/api/health

---

## 💰 Cost

Everything is **FREE**:
- MongoDB Atlas: Free M0 cluster (512 MB)
- Vercel: Free tier (100 GB bandwidth)
- Google OAuth: Free

Only upgrade if you need:
- More database storage
- More bandwidth
- Advanced features
