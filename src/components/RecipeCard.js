import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RecipeCard = ({ recipe, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(recipe.id)}>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{recipe.title}</Text>
                
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
    },
    textContainer: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default RecipeCard;
