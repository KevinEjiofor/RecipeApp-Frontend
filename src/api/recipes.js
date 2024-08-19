import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.0.10:3030'; 

const setAuthHeader = async () => {
    const token = await AsyncStorage.getItem('jwt');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

export const searchRecipes = async (query) => {
    try {
        await setAuthHeader(); 
        
        const config = {
            method: 'get',
            maxBodyLength: Infinity, 
            url: `${API_BASE_URL}/search`, // Adjusted URL to match the backend route
            params: {
                query,
            },
            headers: {}
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error('Error searching recipes:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred');
    }
};

export const getRecipeDetails = async (Id) => {
    try {
      await setAuthHeader();
      
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/recipe/${Id}`, 
        headers: {} 
      };
  
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe details:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : new Error('An unknown error occurred');
    }
  };