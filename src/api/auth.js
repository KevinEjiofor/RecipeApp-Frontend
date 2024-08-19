import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.10:3030/auth'; 

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
export const login = async ({ email, password }) => {
    try {
        console.log("Entered login function with credentials:", email, password);

        const response = await axios.post(
            `${API_BASE_URL}/login`,
            { email, password }, 
            { headers: { 'Content-Type': 'application/json' } }
        );

        const { token } = response.data;
        if (token) {
            await AsyncStorage.setItem('jwt', token);
            setAuthHeader(token); 
        }

        console.log("Response data:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error logging in:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred'); 
    }
};



// export const login = async ({email, password}) => {
//     try {
//         console.log("Entered login function with credentials:", email, password);

//         const response = await axios.post(`${API_BASE_URL}/login`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },body: JSON.stringify({ email, password }),
//         });
//         const { token } = response.data;
//         if (token) {
//             await AsyncStorage.setItem('jwt', token);
//             setAuthHeader(token); 
//         }


//         console.log("Response data:", response.data);

//         return response.data;
//     } catch (error) {
//         console.error("Error logging in:", error.response ? error.response.data : error.message);
//         throw error.response ? error.response.data : new Error('An unknown error occurred'); 
//     }
// };
export const forgotPassword = async (email) => {
    try {
       

        const response = await axios.post(`${API_BASE_URL}/forgotpassword`, { email }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

       

        return response.data;
    } catch (error) {
        console.error("Error sending password reset email:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred');
    }
};
export const resetPassword = async ({ resetPin, newPassword }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/resetpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resetPin, newPassword }),
        });

        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to reset password');
        }

        return data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};


export const validateResetPin = async (resetPin) => {
    try {
        console.log("Entered validateResetPin function with resetPin:", resetPin);

        const response = await axios.put(`${API_BASE_URL}/validate-reset-pin`, { resetPin }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("Response data:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error validating reset pin:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('An unknown error occurred');
    }
};