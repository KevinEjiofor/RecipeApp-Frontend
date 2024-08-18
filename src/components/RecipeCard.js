import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FavoriteButton from './FavoriteButton';

const RecipeCard = ({ recipe, userId, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(recipe.id)}>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{recipe.title}</Text>
                <FavoriteButton userId={userId} recipeId={recipe.id} isFavorite={recipe.isFavorite} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RecipeCard;
