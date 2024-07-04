import axios from "axios";
import { Barbershop } from "./interface/barbershop.interface";
import AuthToken from "./Store/AuthToken";
import Constants from 'expo-constants';

export const barbershopService = {
  async listBarbershops(name?: string): Promise<Barbershop> {
    try {
      const token = await AuthToken.getToken();      
      const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
      const response = await axios.get(`${baseUrl}/barbershop`, {
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
      
      const response = await axios.post(`${baseUrl}/barbershop`, data, {
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
  }
}