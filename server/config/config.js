module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || '7d',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
      ? `${process.env.PRODUCTION_URL}/api/auth/google/callback`
      : 'http://localhost:5000/api/auth/google/callback',
  },
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTION_URL
      : process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
};
