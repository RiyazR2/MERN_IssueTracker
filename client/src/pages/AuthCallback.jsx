import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        toast.error('Authentication failed. Please try again.');
        navigate('/login');
        return;
      }

      if (!token) {
        toast.error('No token received');
        navigate('/login');
        return;
      }

      try {
        // Save token temporarily to make API call
        localStorage.setItem('token', token);

        // Get user data
        const response = await authService.getMe();
        
        if (response.success && response.data) {
          login(token, response.data);
          toast.success('Login successful!');
          navigate('/');
        } else {
          throw new Error('Failed to get user data');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication failed. Please try again.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600">Authenticating...</p>
    </div>
  );
};

export default AuthCallback;
