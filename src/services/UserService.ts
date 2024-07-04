import axios from 'axios';
import Constants from 'expo-constants';

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
      const response = await axios.post(`${baseUrl}/user`, fixedData);
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