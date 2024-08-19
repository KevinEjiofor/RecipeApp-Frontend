import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getRecipeDetails } from '../api/recipes';
import { addFavorite, deleteFavorite } from '../api/favorites'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { htmlToText } from 'html-to-text';

const RecipeDetailsScreen = ({ route }) => {
    const { recipeId, userId } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const data = await getRecipeDetails(recipeId);
                setRecipe(data);
                setIsFavorite(data.isFavorite); 
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    const toggleFavorite = async () => {
        try {
            console.log(`Current favorite status: ${isFavorite}`);
            console.log(`Recipe ID: ${recipeId}`);
    
            if (isFavorite) {
                console.log(`Deleting favorite with ID: ${recipeId}`);
                await deleteFavorite(recipeId);
                setIsFavorite(false);
            } else {
                await addFavorite({
                    recipeId,
                    title: recipe.title,
                    ingredients: recipe.extendedIngredients.map(ing => ing.original),
                });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };
    

    // const toggleFavorite = async () => {
    //     try {
    //         if (isFavorite) {
    //             await deleteFavorite(recipeId);
    //             setIsFavorite(false);
    //         } else {
    //             await addFavorite({
    //                 recipeId,
    //                 title: recipe.title,
    //                 ingredients: recipe.extendedIngredients.map(ing => ing.original),
    //             });
    //             setIsFavorite(true);
    //         }
    //     } catch (error) {
    //         console.error('Error toggling favorite status:', error);
    //     }
    // };

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (!recipe) {
        return <Text style={styles.error}>Recipe not found</Text>;
    }

    // Convert HTML summary and instructions to plain text
    const summaryText = htmlToText(recipe.summary || '');
    const instructionsText = htmlToText(recipe.instructions || '');

    return (
        <ScrollView style={styles.container}>
            {recipe.image && (
                <Image source={{ uri: recipe.image }} style={styles.image} />
            )}
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.subtitle}>Summary:</Text>
            <Text style={styles.text} numberOfLines={5}>
                {summaryText || 'Summary not available'}
            </Text>
            <Text style={styles.subtitle}>Ingredients:</Text>
            {recipe.extendedIngredients.map((ingredient) => (
                <View key={ingredient.id} style={styles.ingredientContainer}>
                    <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }} style={styles.ingredientImage} />
                    <Text style={styles.text}>{ingredient.original}</Text>
                </View>
            ))}
            <Text style={styles.subtitle}>Instructions:</Text>
            <Text style={styles.text}>
                {instructionsText || 'Instructions not available'}
            </Text>
            <Text style={styles.subtitle}>Nutritional Information:</Text>
            <Text style={styles.text}>Calories per serving: {recipe.pricePerServing}</Text>
            <Text style={styles.text}>Health Score: {recipe.healthScore}</Text>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                <Icon
                    name={isFavorite ? 'heart' : 'heart-o'}
                    size={30}
                    color={isFavorite ? 'red' : 'gray'}
                />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientImage: {
        width: 40,
        height: 40,
        marginRight: 10,
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
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
});

export default RecipeDetailsScreen;
