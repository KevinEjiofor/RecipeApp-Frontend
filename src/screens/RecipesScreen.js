import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { searchRecipes } from '../api/recipes';
import RecipeCard from '../components/RecipeCard';

const RecipesScreen = ({ navigation, route }) => {
    const { userId } = route.params;
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const results = await searchRecipes(query);
            setRecipes(results);
        } catch (error) {
            console.error('Error searching recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRecipePress = (recipeId) => {
        navigation.navigate('RecipeDetails', { recipeId, userId });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search recipes..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
            />
            {loading ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <RecipeCard recipe={item} userId={userId} onPress={handleRecipePress} />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default RecipesScreen;
