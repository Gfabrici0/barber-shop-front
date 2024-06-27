import * as SecureStore from 'expo-secure-store';

class AuthToken {
    static async storeToken(token: string) {
        try {
            await SecureStore.setItemAsync('auth_token', token);
        } catch (error) {
            console.error('Failed to store the token', error);
        }
    }

    static async getToken() {
        try {
            return await SecureStore.getItemAsync('auth_token');
        } catch (error) {
            console.error('Failed to retrieve the token', error);
            return null;
        }
    }

    static async deleteToken() {
        try {
            await SecureStore.deleteItemAsync('auth_token');
            console.log('Token deleted successfully');
        } catch (error) {
            console.error('Failed to delete the token', error);
        }
    }

    static async makeAuthenticatedRequest(url: string, options: { headers?: Record<string, string> } = {}) {
        try {
            const token = await this.getToken();
            if (!token) {
                console.error('Authentication token not available');
                return null;
            }
            const headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            };
            const response = await fetch(url, { ...options, headers });
            return response.json();
        } catch (error) {
            console.error('Request failed', error);
            return null;
        }
    }
}

export default AuthToken;