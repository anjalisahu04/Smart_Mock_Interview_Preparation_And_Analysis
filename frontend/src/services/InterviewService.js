import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

const getAuthHeader = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
      }
    } catch (e) {
      console.error('Error parsing user:', e);
    }
  }
  return {};
};

const InterviewService = {
  startInterview: async (config) => {
    try {
      console.log('Sending start interview request:', config);
      const response = await axios.post(
        `${API_URL}interview/start`,
        config,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Start interview error:', error.response?.data);
      throw error;
    }
  },

  submitAnswer: async (sessionId, questionIndex, answer, audioFile = null) => {
    try {
      const formData = new FormData();
      formData.append('questionIndex', questionIndex);
      if (answer && answer.trim()) {
        formData.append('answer', answer);
      }
      if (audioFile) {
        formData.append('audio', audioFile);
      }
      
      const response = await axios.post(
        `${API_URL}interview/${sessionId}/answer`,
        formData,
        {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data',
          }, timeout:30000,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Submit answer error:', error.response?.data);
      throw error;
    }
  },

  completeInterview: async (sessionId) => {
    try {
      const response = await axios.post(
        `${API_URL}interview/${sessionId}/complete`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Complete interview error:', error.response?.data);
      throw error;
    }
  },

  getSession: async (sessionId) => {
    try {
      const response = await axios.get(
        `${API_URL}interview/${sessionId}`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Get session error:', error.response?.data);
      throw error;
    }
  },

  getDashboard: async () => {
    try {
      const response = await axios.get(
        `${API_URL}dashboard`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Get dashboard error:', error.response?.data);
      throw error;
    }
  }
};

export default InterviewService;