import api from './api';

const issueService = {
  // Get all issues
  getIssues: async (params = {}) => {
    const response = await api.get('/issues', { params });
    return response.data;
  },

  // Get single issue
  getIssue: async (id) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  // Create issue
  createIssue: async (data) => {
    const response = await api.post('/issues', data);
    return response.data;
  },

  // Update issue
  updateIssue: async (id, data) => {
    const response = await api.patch(`/issues/${id}`, data);
    return response.data;
  },

  // Delete issue
  deleteIssue: async (id) => {
    const response = await api.delete(`/issues/${id}`);
    return response.data;
  },
};

export default issueService;
