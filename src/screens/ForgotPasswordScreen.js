import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from '../api'; // Assume this function handles the API call

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        setLoading(true);
        try {
            await sendPasswordResetEmail(email);
            Alert.alert('Success', 'Password reset email sent.');
            navigation.navigate('Login'); // Redirect to login screen after email is sent
        } catch (error) {
            Alert.alert('Error', 'Failed to send password reset email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleForgotPassword}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? "Sending..." : "Send Reset Email"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;
