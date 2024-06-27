import axios from "axios";
import AuthToken from "./Store/AuthToken";

export const appointmentService = {

    async fetchAppointmentByUserId(userId: string): Promise<any> {
        try {
            const token = await AuthToken.getToken();
            const response = await axios.get(`http://192.168.57.158:8080/scheduling/user/${userId}`, {
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