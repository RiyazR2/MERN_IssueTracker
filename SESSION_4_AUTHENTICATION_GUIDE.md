# 🔐 SESSION 4: AUTHENTICATION SYSTEM (Deep Dive)

> **Topic:** Google OAuth + JWT Tokens  
> **Difficulty:** ⭐⭐⭐ (Important for interviews!)  
> **Time:** 1.5-2 hours

---

## 🎯 **What You'll Learn**

1. ✅ Authentication vs Authorization
2. ✅ Google OAuth 2.0 complete flow
3. ✅ JWT (JSON Web Tokens) kaise kaam karte hain
4. ✅ Protected routes kaise banate hain
5. ✅ Session vs Token based authentication

---

## 📚 **PART 1: Authentication Basics**

### **1.1 Real-Life Analogy**

**Imagine a Club/Party:**

1. **Authentication (पहचान):** 
   - Bouncer: "ID card dikhao - tum kaun ho?"
   - You: *Shows ID*
   - Bouncer: "OK, tum Riyaz ho" ✅

2. **Authorization (अधिकार):**
   - Bouncer: "VIP section mein jaana hai?"
   - Checks ID: "Nahi, tum regular member ho, VIP access nahi" ❌

**In Our App:**

- **Authentication:** User Google se login karta hai (proof of identity)
- **Authorization:** Sirf logged-in users hi issues create kar sakte hain

---

### **1.2 Session vs Token Authentication**

#### **Method 1: Session-based (Traditional)**

```
User logs in
  ↓
Server creates session
  ↓
Server stores session in database/memory
  ↓
Server sends session ID to user (cookie)
  ↓
User sends cookie with every request
  ↓
Server looks up session in database
```

**Problems:**
- ❌ Server ko session store karna padta hai (memory waste)
- ❌ Multiple servers pe scale nahi hota (session kahan store ho?)
- ❌ Slow (har request pe database lookup)

---

#### **Method 2: Token-based (Modern - We Use This!)**

```
User logs in
  ↓
Server creates JWT token
  ↓
Server sends token to user
  ↓
User stores token (localStorage)
  ↓
User sends token with every request (Authorization header)
  ↓
Server verifies token (no database lookup needed!)
```

**Benefits:**
- ✅ Stateless (server ko kuch store nahi karna)
- ✅ Scalable (multiple servers work easily)
- ✅ Fast (no database lookup)
- ✅ Perfect for APIs and mobile apps

---

### **1.3 What is JWT (JSON Web Token)?**

**Simple Definition:**  
JWT = Encrypted message that proves "I am logged in"

**Real-life Analogy:**  
Jaise movie ticket pe barcode hota hai:
- Ticket pe naam, seat number, show time print hai
- Theater wala scan karke verify karta hai "ye genuine ticket hai"
- Fake ticket nahi bana sakte (encrypted)

**JWT Structure:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWJjMTIzIiwiaWF0IjoxNjg5MDAwMDAwfQ.K7_signature_hash_here

│─────────── HEADER ───────────│  │───── PAYLOAD ─────│  │─── SIGNATURE ───│
```

**3 Parts:**

1. **Header:**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
*Hinglish:* "HS256 algorithm se encrypted hai, type JWT hai"

2. **Payload:**
```json
{
  "id": "64abc123",
  "iat": 1689000000,
  "exp": 1689604800
}
```
*Hinglish:* "User ID 64abc123 hai, token 7 din baad expire hoga"

3. **Signature:**
```javascript
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  JWT_SECRET
)
```
*Hinglish:* "Secret key se sign kiya gaya - tamper-proof!"

---

## 📚 **PART 2: Google OAuth Flow**

### **2.1 What is OAuth?**

**Simple Definition:**  
OAuth = Google se login karo, apna password tumhare app ko mat do

**Why use OAuth?**

**Without OAuth:**
```
Your App: "Gmail ka password do"
User: "Nahi, trust nahi hai tumpe! 😰"
```

**With OAuth:**
```
Your App: "Google se login karo"
User clicks → Google login page
Google: "Yeh app tumhara email access karna chahta hai, allow?"
User: "OK" ✅
Google tells your app: "Ye user genuine hai, ye lo access token"
```

**Benefits:**
- ✅ User ka password tumhe nahi pata
- ✅ Google handles security
- ✅ User ka Google account se trust hai

---

### **2.2 Complete OAuth Flow - Step by Step**

```
┌──────────┐          ┌──────────┐          ┌──────────┐
│  BROWSER │          │   YOUR   │          │  GOOGLE  │
│  (React) │          │  SERVER  │          │  OAUTH   │
└────┬─────┘          └────┬─────┘          └────┬─────┘
     │                     │                     │
     │ 1. User clicks     │                     │
     │ "Login with Google"│                     │
     │─────────────────────>                     │
     │                     │                     │
     │ 2. Redirect to      │                     │
     │    /api/auth/google │                     │
     │─────────────────────>                     │
     │                     │                     │
     │                     │ 3. Redirect to      │
     │                     │    Google login     │
     │                     │─────────────────────>
     │                     │                     │
     │                4. Google login page       │
     │<──────────────────────────────────────────┤
     │                     │                     │
     │ 5. User enters      │                     │
     │    credentials      │                     │
     │─────────────────────────────────────────> │
     │                     │                     │
     │                     │ 6. Auth code        │
     │                     │<────────────────────┤
     │                     │                     │
     │                     │ 7. Exchange code    │
     │                     │    for profile      │
     │                     │─────────────────────>
     │                     │                     │
     │                     │ 8. User profile     │
     │                     │<────────────────────┤
     │                     │                     │
     │                     │ 9. Create/Find user │
     │                     │    in database      │
     │                     │                     │
     │ 10. JWT token       │                     │
     │<────────────────────┤                     │
     │                     │                     │
```

**Hinglish Explanation:**

**Step 1-2:** User "Login with Google" button pe click karta hai, React backend ko request bhejta hai

**Step 3-4:** Backend user ko Google login page pe redirect karta hai

**Step 5:** User apna Google email/password dalta hai

**Step 6-8:** Google tumhare backend ko user ka profile bhejta hai (name, email, photo)

**Step 9:** Backend database mein check karta hai - user already hai ya naya hai

**Step 10:** Backend JWT token generate karke user ko bhejta hai

---

## 📚 **PART 3: Code Deep Dive**

### **3.1 Passport Configuration - passport.js**

**File:** `server/config/passport.js` (41 lines)

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const config = require('./config');

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Magic happens here!
    }
  )
);
```

**Line-by-Line:**

---

#### **Config Object:**

```javascript
{
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
}
```

**Hinglish:**

- **clientID:** Tumhare app ka Google pe registration number
  Example: `"1234567890-abc123def456.apps.googleusercontent.com"`

- **clientSecret:** Password (secret key - kabhi share mat karo!)
  Example: `"GOCSPX-xyz789abc123"`

- **callbackURL:** Google login ke baad kahan redirect ho
  Example: `"http://localhost:5000/api/auth/google/callback"`

**Where to get these?**
Google Cloud Console → Create OAuth 2.0 Client ID

---

#### **Callback Function:**

```javascript
async (accessToken, refreshToken, profile, done) => {
```

**Parameters explained:**

| Parameter | What it is |
|-----------|-----------|
| `accessToken` | Google ka access token (Google APIs call karne ke liye) |
| `refreshToken` | Token renew karne ke liye (optional) |
| `profile` | User ki Google profile info |
| `done` | Callback function (success/error batane ke liye) |

**`profile` object looks like:**
```javascript
{
  id: "117234567890123456789",
  displayName: "Riyaz Pathan",
  emails: [{ value: "riyaz@gmail.com" }],
  photos: [{ value: "https://lh3.googleusercontent.com/a/abc123..." }]
}
```

---

#### **Business Logic:**

```javascript
// Check if user already exists
let user = await User.findOne({ googleId: profile.id });

if (user) {
  // User exists, return user
  return done(null, user);
}
```

**Hinglish:**
1. Database mein check karo - ye Google ID pehle se hai?
2. Agar hai, to user return kar do (login successful!)

---

```javascript
// Create new user
user = await User.create({
  googleId: profile.id,
  name: profile.displayName,
  email: profile.emails[0].value,
  image: profile.photos[0].value,
});

done(null, user);
```

**Hinglish:**
1. Agar user naya hai (pehli baar login kar raha)
2. Database mein nayi entry banao
3. User object return karo

**Real example:**
```javascript
// New user created in MongoDB:
{
  _id: "64abc123...",
  googleId: "117234567890123456789",
  name: "Riyaz Pathan",
  email: "riyaz@gmail.com",
  image: "https://lh3.googleusercontent.com/...",
  createdAt: "2024-01-15T10:30:00.000Z"
}
```

---

```javascript
done(null, user);
```

**Hinglish:** "Success! User object pass kar do next step ko"

**Error handling:**
```javascript
done(error, null);
```
**Hinglish:** "Error aaya, user null bhej do"

---

### **3.2 JWT Utilities - jwt.js**

**File:** `server/utils/jwt.js` (27 lines)

#### **Function 1: Generate Token**

```javascript
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};
```

**Hinglish Breakdown:**

```javascript
jwt.sign(payload, secret, options)
```

- **`payload`:** Jo data token mein store karna hai
  ```javascript
  { id: "64abc123..." }
  ```

- **`secret`:** Encryption key (strong password)
  ```javascript
  JWT_SECRET = "my-super-secret-key-min-32-chars-long"
  ```

- **`options`:** Settings
  ```javascript
  { expiresIn: '7d' }  // 7 days baad expire
  ```

**How it works:**

```javascript
const token = generateToken('64abc123...');

console.log(token);
// Output:
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWJjMTIzIiwiaWF0IjoxNjg5MDAwMDAwLCJleHAiOjE2ODk2MDQ4MDB9.signature"
```

**Decode karo to:**
```json
{
  "id": "64abc123...",
  "iat": 1689000000,  // Issued at (kab banaya)
  "exp": 1689604800   // Expires (kab expire hoga)
}
```

---

#### **Function 2: Verify Token**

```javascript
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
```

**Hinglish:**

```javascript
// Valid token
const decoded = verifyToken("eyJhbGci...");
console.log(decoded);
// { id: "64abc123...", iat: ..., exp: ... }

// Invalid/Expired token
const decoded = verifyToken("fake-token");
console.log(decoded);
// null
```

**Why try-catch?**

| Error | Reason |
|-------|--------|
| `JsonWebTokenError` | Token tampered (signature wrong) |
| `TokenExpiredError` | Token expired (7 days ho gaye) |
| `NotBeforeError` | Token abhi active nahi (future token) |

---

### **3.3 Auth Middleware - auth.js**

**File:** `server/middleware/auth.js` (55 lines)

**Purpose:** Protect routes - sirf logged-in users access kar sakein

---

#### **Step 1: Extract Token from Header**

```javascript
let token;

if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  token = req.headers.authorization.split(' ')[1];
}
```

**Hinglish:**

Request headers mein token dhundo:

```javascript
// Request from frontend:
{
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR..."
  }
}

// Extract:
"Bearer eyJhbGci..." → split(' ') → ["Bearer", "eyJhbGci..."]
token = "eyJhbGci..."  // Index [1]
```

**Why "Bearer"?**
Industry standard - "Bearer token" means "ye token jo bhi hold karta hai, usko access do"

---

#### **Step 2: Check if Token Exists**

```javascript
if (!token) {
  return res.status(401).json({
    success: false,
    message: 'Not authorized to access this route. Please login.',
  });
}
```

**Hinglish:** Token nahi mila? 401 Unauthorized error!

**Status Code 401:** "Authentication required - tum logged in nahi ho"

---

#### **Step 3: Verify Token**

```javascript
const decoded = verifyToken(token);

if (!decoded) {
  return res.status(401).json({
    success: false,
    message: 'Invalid token. Please login again.',
  });
}
```

**Hinglish:**

```javascript
// Token fake hai ya expired?
verifyToken("fake-token") → null
// Error bhej do!

// Token valid hai?
verifyToken("valid-token") → { id: "64abc123..." }
// Next step pe jao!
```

---

#### **Step 4: Get User from Database**

```javascript
const user = await User.findById(decoded.id).select('-__v');

if (!user) {
  return res.status(401).json({
    success: false,
    message: 'User not found. Please login again.',
  });
}
```

**Hinglish:**

1. Token se user ID nikalo (`decoded.id`)
2. Database mein us ID se user dhundo
3. Agar user deleted ho gaya, error!

**`.select('-__v')`:** MongoDB ka internal field `__v` mat bhejo (unnecessary)

---

#### **Step 5: Attach User to Request**

```javascript
req.user = user;
next();
```

**Hinglish:**

**This is magic! ✨**

```javascript
// Request object mein user add kar do
req.user = {
  _id: "64abc123...",
  name: "Riyaz",
  email: "riyaz@gmail.com",
  image: "https://..."
}

// Ab agle middleware/route handler mein:
app.post('/api/issues', protect, (req, res) => {
  console.log(req.user);  // User mil gaya! ✅
  // Issue create karte waqt createdBy set kar sakte ho
});
```

---

## 📚 **PART 4: Complete Authentication Flow**

### **Scenario: User creates a new issue**

```
┌─────────────────────────────────────────────────────────────┐
│           COMPLETE FLOW: Create Issue (Protected)           │
└─────────────────────────────────────────────────────────────┘

STEP 1: User fills form and clicks "Create"
  ↓
STEP 2: React sends request
  ↓
  fetch('http://localhost:5000/api/issues', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGci...',  ← JWT Token
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Fix navbar',
      description: 'Navbar not responsive'
    })
  })
  ↓
STEP 3: Backend receives request
  ↓
STEP 4: Route with protect middleware
  ↓
  app.post('/api/issues', protect, issueController.create)
                          ↑
                     Middleware runs first!
  ↓
STEP 5: protect middleware extracts token
  ↓
  token = "eyJhbGci..."
  ↓
STEP 6: Verify token
  ↓
  decoded = { id: "64abc123..." }
  ↓
STEP 7: Find user in database
  ↓
  user = { _id: "64abc123...", name: "Riyaz", ... }
  ↓
STEP 8: Attach user to request
  ↓
  req.user = user
  ↓
STEP 9: Call next() → goes to issueController.create
  ↓
STEP 10: Controller creates issue
  ↓
  const issue = await Issue.create({
    title: req.body.title,
    description: req.body.description,
    // createdBy: req.user._id  (if we had this field)
  })
  ↓
STEP 11: Send response
  ↓
  res.status(201).json({ success: true, data: issue })
```

---

## ✅ **SESSION 4 CHECKLIST**

- [ ] Authentication vs Authorization difference clear?
- [ ] JWT structure (Header, Payload, Signature) samjha?
- [ ] Google OAuth flow step-by-step pata chala?
- [ ] Passport.js ka Google Strategy samjha?
- [ ] JWT generate aur verify karna aaya?
- [ ] Protect middleware ka flow clear hai?
- [ ] req.user kaise set hota hai samjha?

---

## 🎯 **INTERVIEW QUESTIONS - SESSION 4**

**Q1: Explain JWT authentication**
**A:** JWT (JSON Web Token) is a stateless authentication method. When a user logs in, the server generates a signed token containing user ID and expiration time. The client stores this token and sends it with each request in the Authorization header. The server verifies the signature without database lookup, making it scalable and fast.

**Q2: Why use Google OAuth instead of traditional email/password?**
**A:** OAuth provides better security - we never handle user passwords. Google manages authentication and security. Users trust Google more than unknown apps. It also provides a smoother UX with one-click login.

**Q3: How do you protect routes in Express?**
**A:** Using middleware functions. The protect middleware extracts the JWT from the Authorization header, verifies it using the secret key, fetches the user from database, and attaches it to req.user. If any step fails, it returns 401 Unauthorized. Protected routes use this middleware before the controller.

**Q4: What happens if someone tampers with a JWT?**
**A:** JWT has a signature created using HMAC with the secret key. If someone changes the payload (e.g., changes user ID), the signature won't match, and jwt.verify() will throw an error. The token will be rejected.

---

**AMAZING PROGRESS! 🎉**

**Next:** Session 5 - Routes & Controllers (API Endpoints)

