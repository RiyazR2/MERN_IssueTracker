# Issue Tracker

A full-stack issue management system built with MongoDB, Express, React, and Node.js. This project was created to explore modern full-stack development practices and deploy a production-ready application.

**Live Demo:** [https://mern-issue-tracker-app.vercel.app](https://mern-issue-tracker-app.vercel.app)

## Overview

This application allows teams to track and manage issues efficiently. Users can browse issues publicly, but authentication is required to create, edit, or delete entries. The dashboard provides real-time statistics and visualizations to monitor project health.

## Key Features

- **Public Dashboard** - Browse issues and statistics without authentication
- **Google OAuth Login** - Secure authentication with JWT session management
- **Issue Management** - Create, update, and delete issues with markdown-supported descriptions
- **Status Tracking** - Move issues through OPEN → IN PROGRESS → CLOSED workflow
- **Team Collaboration** - Assign issues to team members
- **Visual Analytics** - Charts showing issue distribution by status
- **Responsive UI** - Mobile-friendly interface built with Tailwind CSS and Radix UI

## Technology Stack

**Frontend:**
- React 18 with Vite for fast development builds
- React Router for client-side routing
- Tailwind CSS + Radix UI for accessible, responsive components
- React Hook Form with Zod validation for type-safe forms
- SimpleMDE for markdown editing
- Recharts for data visualization
- Axios for API communication

**Backend:**
- Node.js + Express.js REST API
- MongoDB Atlas with Mongoose ODM
- Passport.js for Google OAuth 2.0 integration
- JWT for stateless authentication
- Express-validator for request validation

**Deployment:**
- Vercel (Serverless Functions + Static Hosting)
- MongoDB Atlas (Database)

## Getting Started

### Prerequisites

- Node.js v18+ and npm
- MongoDB Atlas account ([free tier available](https://www.mongodb.com/cloud/atlas))
- Google Cloud Console project for OAuth credentials

### Installation

1. **Clone and install dependencies:**

```bash
git clone https://github.com/RiyazR2/MERN_IssueTracker.git
cd MERN_IssueTracker

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

2. **Configure environment variables:**

Create `server/.env`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string_min_32_chars
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

3. **Start development servers:**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

### Setting Up Google OAuth

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to "APIs & Services" → "Credentials"
4. Create OAuth 2.0 Client ID credentials
5. Configure authorized redirect URIs:
   - Local: `http://localhost:5000/api/auth/google/callback`
   - Production: `https://your-backend-url.vercel.app/api/auth/google/callback`
6. Add authorized JavaScript origins:
   - Local: `http://localhost:5173`
   - Production: `https://your-frontend-url.vercel.app`
7. Copy the Client ID and Client Secret to your `.env` files

### Setting Up MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new free-tier cluster (M0)
3. Add database user (Database Access → Add New User)
4. Whitelist IP addresses (Network Access → Add IP Address)
   - For development: Add your current IP
   - Or use `0.0.0.0/0` to allow all (not recommended for production)
5. Get connection string: Click "Connect" → "Connect your application"
6. Replace `<password>` with your database user password
7. Add connection string to `server/.env`

## Deployment

This project is configured for deployment on Vercel with separate frontend and backend services.

### Deploy Backend

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to server folder: `cd server`
3. Deploy: `vercel`
4. Follow prompts and set root directory to `server`
5. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from your local `server/.env`
   - Update `CLIENT_URL` to your frontend URL after deploying it

### Deploy Frontend

1. Navigate to client folder: `cd client`
2. Deploy: `vercel`
3. Set root directory to `client`
4. Add environment variables:
   - `VITE_API_URL` → Your backend URL from previous step
   - `VITE_GOOGLE_CLIENT_ID` → Same as in local setup

### Post-Deployment

After both services are deployed:

1. Update Google OAuth credentials:
   - Add production redirect URI
   - Add production JavaScript origins
2. Update `CLIENT_URL` in backend environment variables
3. Redeploy backend to apply changes

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Project Structure

```
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── common/       # Shared components (Navbar, Spinner, etc.)
│   │   │   ├── issues/       # Issue-specific components
│   │   │   └── dashboard/    # Dashboard widgets
│   │   ├── pages/            # Route pages
│   │   ├── services/         # API client services
│   │   ├── context/          # React Context providers
│   │   └── utils/            # Helper functions & constants
│   └── package.json
│
├── server/                    # Express backend
│   ├── config/               # Database & auth configuration
│   ├── controllers/          # Business logic handlers
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── middleware/           # Custom middleware (auth, validation)
│   ├── utils/                # JWT utilities & validators
│   └── package.json
│
└── Documentation files
```

## API Endpoints

**Authentication:**
- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - OAuth callback handler
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

**Issues:**
- `GET /api/issues` - Get all issues (public, supports filtering)
- `POST /api/issues` - Create issue (protected)
- `GET /api/issues/:id` - Get single issue (public)
- `PATCH /api/issues/:id` - Update issue (protected)
- `DELETE /api/issues/:id` - Delete issue (protected)

**Users:**
- `GET /api/users` - Get all users for assignment dropdown (public)

## Development Notes

### Architecture Decisions

- **Separate Frontend/Backend**: Chose MERN over Next.js to demonstrate understanding of client-server architecture, API design, and CORS handling
- **Public-First Strategy**: Made dashboard and issues browsable without login to reduce friction for new users while protecting write operations
- **JWT over Sessions**: Stateless authentication better suited for serverless deployment and horizontal scaling

### Challenges Faced

During development, I encountered and solved several interesting problems:

1. **OAuth Token Security**: Initially passed JWT in URL query params. Recognized security risk and documented improvement path using HTTP-only cookies
2. **Vercel Serverless Routing**: Had to restructure Express app export and configure `vercel.json` for proper serverless function handling
3. **Client-Side Routing on Vercel**: Added rewrite rules to support React Router's browser-based routing in production

For a complete list of known issues and improvement plans, see [KNOWN_ISSUES_AND_FIXES.md](./KNOWN_ISSUES_AND_FIXES.md)

## What I Learned

This project helped me gain hands-on experience with:
- Full-stack MERN development from scratch
- Google OAuth 2.0 integration with Passport.js
- JWT-based authentication and protected routes
- MongoDB schema design and Mongoose relationships
- Deploying separate services to Vercel's serverless platform
- CORS configuration for cross-origin API requests
- Form validation using Zod and React Hook Form
- Managing global state with React Context API

## Future Improvements

- [ ] Add refresh token mechanism for better security
- [ ] Implement rate limiting to prevent abuse
- [ ] Add comprehensive unit and integration tests
- [ ] Migrate to TypeScript for better type safety
- [ ] Add WebSocket support for real-time updates
- [ ] Implement email notifications for issue assignments

## Contributing

This is a personal project for learning and portfolio purposes, but feel free to fork it and build upon it!

## Author

**Riyaz Pathan**
Frontend Developer with 2+ years of experience

- LinkedIn: [linkedin.com/in/riyazr2](https://www.linkedin.com/in/riyazr2/)
- GitHub: [github.com/RiyazR2](https://github.com/RiyazR2)
- Email: riyazpathan193.rp@gmail.com

## License

This project is open source and available under the MIT License.
