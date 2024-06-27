import * as SecureStore from 'expo-secure-store';
import { UserData } from './interface/userData.interface';

class UserStore {
    static async storeUserData(data: UserData) {
        try {
            const jsonData = JSON.stringify(data);
            await SecureStore.setItemAsync('user_data', jsonData);
            console.log('User data stored successfully');
        } catch (error) {
            console.error('Failed to store user data', error);
        }
    }

    static async getUserData(): Promise<UserData | null> {
        try {
            const jsonData = await SecureStore.getItemAsync('user_data');
            return jsonData ? JSON.parse(jsonData) : null;
        } catch (error) {
            console.error('Failed to retrieve user data', error);
            return null;
        }
    }

    static async getEmail(): Promise<string | null> {
        const userData = await this.getUserData();
        return userData ? userData.email : null;
    }

    static async getName(): Promise<string | null> {
        const userData = await this.getUserData();
        return userData ? userData.username : null;
    }

    static async getDocumento(): Promise<string | null> {
        const userData = await this.getUserData();
        return userData ? userData.document : null;
    }

    static async getId(): Promise<string | null> {
        const userData = await this.getUserData();
        console.log('userData:', userData);
        return userData ? userData.id : null;
    }

    static async getRole(): Promise<string | null> {
        const userData = await this.getUserData();
        return userData ? userData.role : null;
    }

    static async deleteUserData() {
        try {
            await SecureStore.deleteItemAsync('user_data');
            console.log('User data deleted successfully');
        } catch (error) {
            console.error('Failed to delete user data', error);
        }
    }

}

export default UserStore;