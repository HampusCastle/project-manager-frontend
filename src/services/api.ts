import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up the token for authorization in request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth API
export const login = async (username: string, password: string): Promise<any> => {
  const response = await api.post('/users/login', { username, password });
  return response.data;  // This should return both token and role
};

export const registerUser = async (username: string, password: string, email: string) => {
  const response = await api.post('/users/register', { username, password, email });
  return response.data;
};

// Projects API
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (name: string, description: string) => {
  const response = await api.post('/projects', { name, description });
  return response.data;
};

export const deleteProject = async (projectId: string) => {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
};

export const updateProject = async (projectId: string, name: string, description: string) => {
  const response = await api.put(`/projects/${projectId}`, { name, description });
  return response.data;
};

// Tasks API
export const getTasksByProject = async (projectId: string) => {
  const response = await api.get(`/projects/${projectId}/tasks`);
  return response.data;
};

export const createTask = async (name: string, description: string, projectId: string) => {
  const response = await api.post(`/projects/${projectId}/tasks`, {
    title: name, 
    description: description, 
    status: "TODO"
  });
  return response.data;
};

export const updateTaskStatus = async (taskId: string, status: string, projectId: string, title: string, description: string) => {
  try {
    const response = await api.put(`/projects/${projectId}/tasks/${taskId}`, {
      status,
      title,
      description
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);  
    throw error;
  }
};

export const deleteTask = async (projectId: string, taskId: string) => {
    try {
      const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
      console.log("Task deleted:", response.data);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

// User Management API
export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getProjectById = async (projectId: string) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

export const updateUserPassword = async (oldPassword: string, newPassword: string) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    throw new Error('Token not found');  
  }

  const response = await api.put('/users/password', 
    { oldPassword, newPassword }, 
    {
      headers: {
        'Authorization': `Bearer ${token}`, 
      }
    }
  );

  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export default api;