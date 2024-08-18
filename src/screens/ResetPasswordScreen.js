import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { resetPassword } from '../api'; // Assume this function handles the API call

const ResetPasswordScreen = ({ route, navigation }) => {
    const { resetToken } = route.params; // Get the reset token from the route params
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(resetToken, newPassword);
            Alert.alert('Success', 'Password reset successful.');
            navigation.navigate('Login'); 
        } catch (error) {
            Alert.alert('Error', 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleResetPassword}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? "Resetting..." : "Reset Password"}</Text>
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

export default ResetPasswordScreen;
