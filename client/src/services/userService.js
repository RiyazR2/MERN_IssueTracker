import api from './api';

const userService = {
  // Get all users
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};

export default userService;
