import axios from "axios";
import AuthToken from "./Store/AuthToken";
import UserStore from "./Store/UserStore";
import Constants from 'expo-constants';

export const barberServicesService = {

    async registerBarber(data: any): Promise<any> {
        console.log(data);
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            
            const response = await axios.post(`${baseUrl}/barber`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error registering barber:", error);
            throw error;
        }
    },

    async updateService(body: any, id: string) {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            
            const response = await axios.put(`${baseUrl}/barbershop/service/${id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error registering barber:", error);
            throw error;
        }
    },

    async getBarberByEmail(): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const email = await UserStore.getEmail();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            
            const response = await axios.get(`${baseUrl}/barber/email/${email}`, {
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
    },

    async getAppointmentsByUserBarbershopId(userId: string): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            
            const response = await axios.get(`${baseUrl}/scheduling/barbershop/${userId}/pending`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            });
            return response.data.content;
        } catch (error) {
            console.error("Erro ao buscar barbearias:", error);
            throw error;
        }
    },

    async getAppointmentsByUserBarberId(userId: string): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            
            const response = await axios.get(`${baseUrl}/scheduling/barber/${userId}/pending`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            });
            return response.data.content;
        } catch (error) {
            console.error("Erro ao buscar barbearias:", error);
            throw error;
        }
    },

    async updateDemandStatus(demand: any) {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            
            const response = await axios.put(`${baseUrl}/scheduling/${demand.id}/status`, { status: demand.status }, {
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

    async registerService(serviceJson: any) {
        try {
            console.log(serviceJson);
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            
            const response = await axios.post(`${baseUrl}/barbershop/service`, serviceJson, {
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

    async getBarberByUserId(userId: string): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            
            const response = await axios.get(`${baseUrl}/barber/user/${userId}`, {
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

    async getBarberServices(barberId: string): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            /* const response = await axios.get(`${baseUrl}/scheduling/barber/${id}`, { */
            const response = await axios.get(`http://192.168.15.7:8080/barber/service/barber/${barberId}`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data.content;
        } catch (error) {
            console.error("Erro ao buscar barbearias:", error);
            throw error;
        }
    },

    async getBarberAvailabilities(barberId: string): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            console.log('bearer token', token);
            /* const response = await axios.get(`${baseUrl}/scheduling/barber/${id}`, { */
            const response = await axios.get(`http://192.168.15.7:8080/barber/${barberId}/availability`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data.availabilities;
        } catch (error) {
            console.error("Erro ao buscar barbearias:", error);
            throw error;
        }
    }
}