import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {
  async getUserProfile() {
    try {
      console.log('Fetching user profile...');
      const headers = authHeader();
      console.log('Auth headers:', headers);
      
      const response = await axios.get(API_URL + 'profile', { 
        headers: headers 
      });
      
      console.log('Profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }

  async updateProfile(profileData) {
    try {
      console.log('Updating profile...');
      const response = await axios.put(API_URL + 'profile', profileData, { 
        headers: authHeader() 
      });
      
      console.log('Update profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new UserService();









// // services/user.service.js
// import axios from 'axios';
// import authHeader from './auth-header';

// const API_URL = 'http://localhost:8080/api/user/';

// class UserService {
//   async getUserProfile() {
//     try {
//       const response = await axios.get(API_URL + 'profile', {
//         headers: authHeader()
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       throw error;
//     }
//   }

//   async updateProfile(userData) {
//     try {
//       const response = await axios.put(API_URL + 'profile', userData, {
//         headers: authHeader()
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       throw error;
//     }
//   }
// }

// export default new UserService();