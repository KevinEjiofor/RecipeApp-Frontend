import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.10:3030/favorites'; 

const setAuthHeader = async () => {
    const token = await AsyncStorage.getItem('jwt');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};


export const addFavorite = async (recipeData) => {
    await setAuthHeader();
    try {
        const response = await axios.post(API_BASE_URL, recipeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding favorite recipe:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred');
    }
};


export const getFavorites = async () => {
    await setAuthHeader();
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error retrieving favorite recipes:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred');
    }
};
export const deleteFavorite = async (id) => {
    await setAuthHeader();
    try {
        
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting favorite recipe:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred');
    }
};



// export const deleteFavorite = async (id) => {

   
 
//     try {
//         await setAuthHeader();

//         const config = {
//             method: 'delete',
//             maxBodyLength: Infinity,
//             url: `${API_BASE_URL}/${id}`,
//             headers: {},
//         };
//         const response = await axios.request(config);
      
//         return response.data;
//     } catch (error) {
//         console.error('Error deleting favorite recipe:', error.response ? error.response.data : error.message);
//         throw error.response ? error.response.data : new Error('An unknown error occurred');
//     }
// };

