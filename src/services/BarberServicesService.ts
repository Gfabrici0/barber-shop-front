import axios from "axios";
import AuthToken from "./Store/AuthToken";
import UserStore from "./Store/UserStore";
import Constants from 'expo-constants';

export const barberServicesService = {

    async getBarberByEmail(): Promise<any> {
        try {
            console.log('getBarberByEmail')
            const token = await AuthToken.getToken();
            console.log('token', token)
            const email = await UserStore.getEmail();
            console.log('email', email)
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            const response = await axios.get(`${baseUrl}/barber/email/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('response', response)
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar barbeiro:", error);
        }
    },

    async listServices(id: string): Promise<any> {
        try {
        const token = await AuthToken.getToken();
        const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
        const response = await axios.get(`${baseUrl}/barber/service/barber/${id}`, {
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

    async deleteService(id: string): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            const response = await axios.delete(`${baseUrl}/barbershop/service/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting service:", error);
            throw error;
        }
    }
}