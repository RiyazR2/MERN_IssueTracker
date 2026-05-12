import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import IssueList from './pages/IssueList';
import IssueDetail from './pages/IssueDetail';
import NewIssue from './pages/NewIssue';
import EditIssue from './pages/EditIssue';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/issues"
            element={
              <ProtectedRoute>
                <IssueList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/issues/new"
            element={
              <ProtectedRoute>
                <NewIssue />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/issues/:id"
            element={
              <ProtectedRoute>
                <IssueDetail />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/issues/edit/:id"
            element={
              <ProtectedRoute>
                <EditIssue />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;
