import axios from "axios";
import { Barbershop } from "./interface/barbershop.interface";
import AuthToken from "./Store/AuthToken";
import Constants from 'expo-constants';
import { Alert } from "react-native";

export const barbershopService = {
  async listBarbershops(name?: string): Promise<Barbershop> {
    try {
      const token = await AuthToken.getToken();      
      const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
      /* const response = await axios.get(`${baseUrl}/barbershop`, { */
      const response = await axios.get(`http://192.168.3.16:8080/barbershop`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar barbearias:", error);
      throw error;
    }
  },
  async createBarbershop(barbershopData:{
    ownerName: string,
    tradeName: string,
    corporateName: string,
    email: string,
    password: string,
    document: string,
    phoneNumber: string,
    dateOfBirth: Date,
    barbershopAddress: {
      addressCity: string,
      addressStreet: string,
      addressNumber: string
    },
    personalAddress: {
      addressCity: string,
      addressStreet: string,
      addressNumber: string
    }
  }) {
    try {
      const data = {
        ...barbershopData,
        dateOfBirth: barbershopData.dateOfBirth.toISOString().slice(0, 10)
      }
      
      const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
      
      /* const response = await axios.post(`${baseUrl}/barbershop`, data, { */
      const response = await axios.post(`http://192.168.3.16:8080/barbershop`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
      }
      );
      return response;
    }
    catch(exc: any) {
      console.error('Error details:', {
        message: exc.message,
        status: exc.response?.status,
        statusText: exc.response?.statusText,
        responseData: exc.response?.data,
      });
      throw exc;
    }
  },

  async findBarberByOwnerDocument(document: string) : Promise<any> {
    try {
      const token = await AuthToken.getToken();
      const barbershop = await axios.get(`http://192.168.3.16:8080/barbershop/document/${document}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return barbershop.data;
    } catch (err: any) {
      console.error('Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        responseData: err.response?.data,
      });
      Alert.alert("Erro ao buscar barbearia", err.message);
      throw err;
    }
  }
}