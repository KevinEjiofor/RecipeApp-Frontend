import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.10:3030/auth'; // Ensure this is the correct URL

const setAuthHeader = (jwt) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
};

export const signUp = async (userData) => {
    try {
        console.log("Entered signUp function with userData:", userData);

        const response = await axios.post(`${API_BASE_URL}/register`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("Response data:", response.data);

        const { token } = response.data;
        if (token) {
            await AsyncStorage.setItem('jwt', token);
            setAuthHeader(token); 
        }

        return response.data;
    } catch (error) {
        console.error("Error signing up:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred'); 
    }
};

export const login = async (credentials) => {
    try {
        console.log("Entered login function with credentials:", credentials);

        const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("Response data:", response.data);

        const { token } = response.data;
        if (token) {
            await AsyncStorage.setItem('jwt', token);
            setAuthHeader(token); 
        }

        return response.data;
    } catch (error) {
        console.error("Error logging in:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred'); 
    }
};
