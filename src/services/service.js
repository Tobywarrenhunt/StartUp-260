import axios from 'axios';

const API_URL = '/api'; // Proxy to backend

const service = {
  signup: (userData) => {
    return axios.post(`${API_URL}/signup`, userData)
      .then(response => response.data)
      .catch(error => { throw error.response ? error.response.data : 'Sign up failed'; });
  },

  login: (credentials) => {
    return axios.post(`${API_URL}/login`, credentials)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        return response.data;
      })
      .catch(error => { throw error.response ? error.response.data : 'Login failed'; });
  },

  fetchMessages: () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/messages`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.data)
      .catch(error => { throw error.response ? error.response.data : 'Failed to fetch messages'; });
  },

  saveMessage: (message) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/messages`, { message }, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.data)
      .catch(error => { throw error.response ? error.response.data : 'Failed to save message'; });
  },
};

export default service;
