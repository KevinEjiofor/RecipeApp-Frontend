import axios from 'axios';

const API_BASE_URL = 'http://localhost:3030/auth';

export const searchRecipes = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ searchRecipes`, {
            params: {
                query,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};

export const getRecipeDetails = async (recipeId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${recipeId}/getRecipeDetails`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
};
