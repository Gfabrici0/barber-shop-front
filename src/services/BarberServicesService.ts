import axios from "axios";
import { Barbershop } from "./interface/barbershop.interface";
import AuthToken from "./Store/AuthToken";
import UserStore from "./Store/UserStore";

export const barberServicesService = {

    async getBarberByEmail(): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const email = await UserStore.getEmail();
            const response = await axios.get(`http://192.168.57.158:8080/barber/email/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar barbeiro:", error);
        }
    },

    async listServices(id: string): Promise<any> {
        try {
        const token = await AuthToken.getToken();
        const response = await axios.get(`http://192.168.57.158:8080/barber/service/barber/${id}`, {
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
            const response = await axios.delete(`http://192.168.57.158:8080/barbershop/service/${id}`, {
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