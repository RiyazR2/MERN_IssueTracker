# 🐛 Known Issues & Quick Fixes

**Last Updated:** 2026-05-13  
**Status:** Actively Maintained

---

## 🔴 **CRITICAL - Fix These First!**

### **Issue #1: JWT Token in URL**
**Problem:** Token visible in browser history  
**Location:** `authController.js:21`  
**Risk Level:** HIGH  
**Quick Fix:**
```javascript
// Instead of redirect with token in URL
// Use HTTP-only cookie or POST to client
const secureCookie = require('cookie');
res.cookie('auth_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
});
res.redirect(`${clientURL}/auth/callback`);
```

### **Issue #2: No Rate Limiting**
**Problem:** API vulnerable to brute force attacks  
**Location:** All routes  
**Risk Level:** HIGH  
**Quick Fix:**
```bash
npm install express-rate-limit --save
```
```javascript
// In server/index.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100 // 100 requests per IP
});

app.use('/api/', limiter);
```

---

## 🟡 **MEDIUM - Should Fix Soon**

### **Issue #3: Profile Button Does Nothing**
**Problem:** Clicking "Profile" in dropdown has no action  
**Location:** `Navbar.jsx:55-57`  
**Status:** OPEN  
**Quick Fix Option 1 - Remove it:**
```javascript
// Delete lines 54-57 in Navbar.jsx
<DropdownMenu.Separator />
<DropdownMenu.Item>
  <PersonIcon /> Profile
</DropdownMenu.Item>
```

**Quick Fix Option 2 - Add Profile Page:**
```javascript
// Create client/src/pages/Profile.jsx
// Then in Navbar.jsx:
<DropdownMenu.Item onClick={() => navigate('/profile')}>
  <PersonIcon /> Profile
</DropdownMenu.Item>
```

### **Issue #4: No Error Boundary**
**Problem:** Component errors crash entire app  
**Status:** OPEN  
**Quick Fix:**
```javascript
// Create client/src/components/common/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong</h1>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

Then wrap App in `main.jsx`:
```javascript
import ErrorBoundary from './components/common/ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### **Issue #5: Pagination Limit Not Capped**
**Problem:** User can request 999999 items  
**Location:** `issueController.js:8`  
**Status:** OPEN  
**Quick Fix:**
```javascript
// Line 8 in issueController.js
const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Max 100
```

### **Issue #6: No Input Sanitization (XSS Risk)**
**Problem:** User input not sanitized  
**Status:** OPEN  
**Quick Fix:**
```bash
npm install dompurify --save
```
```javascript
// In issueController.js
const DOMPurify = require('isomorphic-dompurify');

const createIssue = async (req, res) => {
  const { title, description } = req.body;
  
  const issue = await Issue.create({
    title: DOMPurify.sanitize(title),
    description: DOMPurify.sanitize(description),
    // ...
  });
};
```

### **Issue #7: MongoDB No Reconnect Logic**
**Problem:** App crashes if DB disconnects  
**Location:** `config/db.js`  
**Status:** OPEN  
**Quick Fix:**
```javascript
// In config/db.js
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection errors
    mongoose.connection.on('error', err => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
      setTimeout(connectDB, 5000); // Retry after 5s
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    setTimeout(connectDB, 5000); // Retry after 5s
  }
};
```

---

## ℹ️ **LOW PRIORITY - Future Enhancements**

### **Issue #8: No MongoDB Indexes**
**Impact:** Slow queries on large datasets  
**Fix:** Add indexes in models:
```javascript
// In models/Issue.js
IssueSchema.index({ status: 1, createdAt: -1 });
IssueSchema.index({ assignedTo: 1 });
```

### **Issue #9: Bundle Not Optimized**
**Impact:** Slow initial load  
**Fix:** Add lazy loading:
```javascript
// In App.jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const IssueList = lazy(() => import('./pages/IssueList'));

<Suspense fallback={<Spinner />}>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</Suspense>
```

### **Issue #10: No Logging System**
**Impact:** Hard to debug production issues  
**Fix:**
```bash
npm install winston --save
```

---

## ✅ **RESOLVED ISSUES**

### **✅ Issue #RESOLVED-1: Logout Not Working**
**Was:** Using `window.location.href` causing full reload  
**Fixed:** Commit `caf9812` - Now using React Router navigate  
**Date:** 2026-05-13

### **✅ Issue #RESOLVED-2: OAuth Redirect URL Wrong**
**Was:** Using `undefined` in callback URL  
**Fixed:** Commit `a88ab92` - Now using CLIENT_URL properly  
**Date:** 2026-05-13

### **✅ Issue #RESOLVED-3: Title Input Field Not Showing**
**Was:** Radix TextField not rendering  
**Fixed:** Commit `1372553` - Changed to standard HTML input  
**Date:** 2026-05-13

### **✅ Issue #RESOLVED-4: No Status Change Option**
**Was:** Missing status selector component  
**Fixed:** Commit `1372553` - Added StatusSelect component  
**Date:** 2026-05-13

---

## 🎯 **Priority Order for Fixes**

**Week 1 (This Week):**
1. Add rate limiting (#2) - 30 min
2. Fix pagination limit (#5) - 5 min
3. Fix/Remove profile button (#3) - 10 min
4. Add Error Boundary (#4) - 20 min

**Week 2:**
1. Add input sanitization (#6) - 1 hour
2. Fix MongoDB reconnect (#7) - 30 min
3. Add indexes (#8) - 15 min

**Week 3+:**
1. Consider token security improvement (#1)
2. Add logging system (#10)
3. Optimize bundle (#9)
4. Add unit tests

---

## 📝 **Testing Checklist After Fixes**

- [ ] Rate limiting works (try 101 requests)
- [ ] Pagination max 100 enforced
- [ ] Profile button fixed
- [ ] Error boundary catches errors
- [ ] XSS attempts blocked
- [ ] MongoDB reconnects on disconnect
- [ ] All existing features still work

---

**Read Full Audit:** See `CODEBASE_AUDIT_REPORT.md` for complete analysis

