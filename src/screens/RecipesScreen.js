import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { searchRecipes } from '../api/recipes';
import { logoutUser } from '../api/auth';
import RecipeCard from '../components/RecipeCard'; 
import Chef from "../../assets/chefHat.png"; 
import Icon from 'react-native-vector-icons/FontAwesome';

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

    const goToFavorites = () => {
        navigation.navigate('Favorites');
    };

    const handleLogout = async () => {
        try {
            await logoutUser(); 
            navigation.replace('Home'); 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={Chef}
                    style={styles.chefIcon}
                />
                <Text style={styles.title}>Chargie Recipe</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="sign-out" size={25} color="red" />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <Text style={styles.label}>Search Recipes</Text> 
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter recipe name..."
                    value={query}
                    onChangeText={setQuery}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Search"
                        onPress={handleSearch} 
                        color="#007bff"
                    />
                </View>
            </View>
            {loading ? (
                <ActivityIndicator size="large" style={styles.loader} /> 
            ) : (
                <FlatList
                    data={recipes} 
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({ item }) => (
                        <RecipeCard 
                            recipe={item} 
                            userId={userId} 
                            onPress={handleRecipePress}
                        />
                    )}
                />
            )}
            <TouchableOpacity style={styles.favoriteButton} onPress={goToFavorites}>
                <Icon name="heart" size={30} color="red" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 50,
    },
    searchContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 15,
    },
    searchInput: {
        height: 45,
        width: '80%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    buttonContainer: {
        width: '70%',
        marginTop: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    chefIcon: {
        width: 60,
        height: 60,
        marginRight: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    favoriteButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    logoutButton: {
        padding: 10,
    },
});

export default RecipesScreen;
