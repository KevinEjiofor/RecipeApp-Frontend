import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
    return (
        <View style={styles.card}>
            {recipe.imageUrl ? (
                <Image 
                    source={{ uri: recipe.imageUrl }} // Ensure this is correct
                    style={styles.image}
                    resizeMode="cover" // Adjust based on your layout
                />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>No Image Available</Text>
                </View>
            )}
            <Text style={styles.title}>{recipe.title}</Text>
            <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
                <Text>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200, // Adjust height based on your layout
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    imageText: {
        color: '#888',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
    favoriteButton: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
});

export default RecipeCard;
