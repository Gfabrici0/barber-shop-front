import axios from 'axios';
import Constants from 'expo-constants';
import AuthToken from './Store/AuthToken';

export const UserService = {
  async registerUser(userData: {
    email: string;
    password: string;
    username: string;
    document: string;
    role: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address: {
      addressNumber: string;
      addressStreet: string;
      addressCity: string;
    }
  }): Promise<any> {
    const fixedData = {
        ...userData,
        dateOfBirth: userData.dateOfBirth.toISOString().slice(0, 10)
    };
    
    const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
    try {
      /* const response = await axios.post(`${baseUrl}/user`, fixedData); */
      const response = await axios.post(`http://192.168.3.16:8080/user`, fixedData);
      return response.data;
    } catch (exc: any) {
      console.error('Error details:', {
        message: exc.message,
        data: exc.response?.data
      });
      throw exc;
    }
  },

  async getUserById(userId: string): Promise<any> {
    try {
      const token = await AuthToken.getToken();
      /* const response = await axios.post(`${baseUrl}/user`, fixedData); */
      const response = await axios.get(`http://192.168.3.16:8080/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          }
      });
      
      return response.data;
    } catch (exc: any) {
      console.error('Error details:', {
        message: exc.message,
        data: exc.response?.data
      });
      throw exc;
    }
  },

  async updateUser(formData: any, userId: string) {
    try {
      const token = await AuthToken.getToken();
      /* const response = await axios.post(`${baseUrl}/user`, fixedData); */
      const response = await axios.put(`http://192.168.3.16:8080/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          }
      });
      
      return response.data;
    } catch (exc: any) {
      console.error('Error details:', {
        message: exc.message,
        data: exc.response?.data
      });
      throw exc;
    }
  }
};