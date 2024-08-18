import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getFavoriteRecipes } from '../api/recipes';
import RecipeCard from '../components/RecipeCard';

const FavoritesScreen = ({ route }) => {
    const { userId } = route.params;
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavoriteRecipes(userId);
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite Recipes</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <RecipeCard recipe={item} userId={userId} />}
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
