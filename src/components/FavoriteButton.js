import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addFavorite, removeFavorite } from '../api/recipes';

const FavoriteButton = ({ userId, recipeId, isFavorite, onFavoriteChange }) => {
    const [favorite, setFavorite] = useState(isFavorite);

    useEffect(() => {
        setFavorite(isFavorite);
    }, [isFavorite]);

    const handlePress = async () => {
        try {
            if (favorite) {
                await removeFavorite(userId, recipeId);
            } else {
                await addFavorite(userId, recipeId);
            }
            setFavorite(!favorite);
            if (onFavoriteChange) onFavoriteChange(!favorite);
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>{favorite ? 'Unfavorite' : 'Favorite'}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ff5722',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FavoriteButton;
