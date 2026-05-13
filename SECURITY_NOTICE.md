# 🔐 SECURITY NOTICE

## ⚠️ IMPORTANT: Credentials Have Been Removed

All sensitive credentials have been cleaned from this repository for security purposes.

---

## 🔑 What Was Removed

The following sensitive information has been removed from all files:

- ❌ MongoDB connection strings (username, password, cluster details)
- ❌ JWT secret keys
- ❌ Google OAuth Client ID and Client Secret
- ❌ Vercel project IDs
- ❌ All production URLs with embedded credentials

---

## ✅ What You Need to Do

### **For Local Development:**

1. **Create `server/.env` file:**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
PRODUCTION_URL=http://localhost:5173
```

2. **Create `client/.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

### **For Deployment:**

Add environment variables directly in Vercel Dashboard:
- Go to: Project Settings → Environment Variables
- Add all required variables
- Never commit actual credentials to Git

---

## 🛡️ Security Best Practices

1. ✅ **Never commit `.env` files** to Git
2. ✅ **Use `.env.example`** files instead (with placeholder values)
3. ✅ **Rotate credentials** if accidentally exposed
4. ✅ **Use environment variables** in deployment platforms
5. ✅ **Add `.env` to `.gitignore`**

---

## 🔄 If Credentials Were Exposed

If you previously committed sensitive credentials:

1. **Rotate all credentials immediately:**
   - Change MongoDB password
   - Generate new Google OAuth credentials
   - Create new JWT secret

2. **Remove from Git history:**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch server/.env client/.env" \
  --prune-empty --tag-name-filter cat -- --all
```

3. **Force push (BE CAREFUL!):**
```bash
git push origin --force --all
```

---

## 📚 Setup Guides

For detailed setup instructions with new credentials:
- Read: `SETUP_GUIDE.md`
- Read: `DEPLOYMENT_GUIDE.md`

---

## ✅ Verified Clean

All sensitive data has been removed from:
- ✅ `.env` files
- ✅ Documentation files
- ✅ Code comments
- ✅ README files
- ✅ Configuration files

**The repository is now safe to share publicly!** 🎉
