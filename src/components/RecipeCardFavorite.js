import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecipeCardFavorite = ({ recipe, onPress, onToggleFavorite }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            {recipe.image ? (  
                <Image 
                    source={{ uri: recipe.image }} 
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>No Image Available</Text>
                </View>
            )}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{recipe.title}</Text>
                <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
                    <Icon name="heart" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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
        height: 200,
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
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    favoriteButton: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 50,
    },
});

export default RecipeCardFavorite;
