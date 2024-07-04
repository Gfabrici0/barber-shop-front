import axios from "axios";
import AuthToken from "./Store/AuthToken";
import Constants from 'expo-constants';

export const appointmentService = {

    async fetchAppointmentByUserId(userId: string): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            const response = await axios.get(`${baseUrl}/scheduling/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching appointment by user ID:", error);
            throw error;
        }
    },
    async createAppointment(appointmentData: {
        date: Date;
        userId: string;
        barbershopId: string;
        serviceId: string;
        barberId: string;
    }) {
        try {
            const token = await AuthToken.getToken();
            const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
            const data = {
                ...appointmentData,
                date: appointmentData.date.toISOString().replace('T', ' ').slice(0, 16)
            }
            console.log('sent data', data)
            const response = await axios.post(`${baseUrl}/scheduling`,
                data
                ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching appointment by user ID:", error);
            throw error;
        }
    }
}