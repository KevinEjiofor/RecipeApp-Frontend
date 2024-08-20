import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getFavorites, deleteFavorite } from '../api/favorites';
import RecipeCardFavorite from '../components/RecipeCardFavorite';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const data = await getFavorites();
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (recipeId) => {
        console.log('Removing favorite:', recipeId);
        try {

            await deleteFavorite(recipeId);
            setFavorites(favorites.filter(favorite => favorite._id !== recipeId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const handleRecipePress = (recipeId) => {
        navigation.navigate('RecipeDetails', { recipeId });
    };

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite Recipes</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => (item._id.$oid || item._id || '').toString()}
                renderItem={({ item }) => (
                    <RecipeCardFavorite 
                        recipe={item} 
                        onPress={() => handleRecipePress(item.recipeId)}
                        onToggleFavorite={() => handleRemoveFavorite(item._id.$oid || item._id)}
                    />
                )}
                showsVerticalScrollIndicator={false}  
            />
        </View>
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
        marginBottom: 15,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default FavoritesScreen;
