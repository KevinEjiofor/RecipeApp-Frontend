// src/components/AuthButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AuthButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AuthButton;
