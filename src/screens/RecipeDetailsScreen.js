import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getRecipeDetails } from '../api/recipes';
import FavoriteButton from '../components/FavoriteButton';

const RecipeDetailsScreen = ({ route }) => {
    const { recipeId, userId } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const data = await getRecipeDetails(recipeId);
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (!recipe) {
        return <Text style={styles.error}>Recipe not found</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.subtitle}>Ingredients:</Text>
            <Text>{recipe.ingredients.join(', ')}</Text>
            <Text style={styles.subtitle}>Instructions:</Text>
            <Text>{recipe.instructions}</Text>
            <FavoriteButton userId={userId} recipeId={recipeId} isFavorite={recipe.isFavorite} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    error: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'red',
    },
});

export default RecipeDetailsScreen;
