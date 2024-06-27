import axios from "axios";
import { Barbershop } from "./interface/barbershop.interface";
import AuthToken from "./Store/AuthToken";

export const barbershopService = {
  async listBarbershops(): Promise<Barbershop> {
    try {
      const token = await AuthToken.getToken();
      const response = await axios.get('http://192.168.57.158:8080/barbershop', {
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
  }
}