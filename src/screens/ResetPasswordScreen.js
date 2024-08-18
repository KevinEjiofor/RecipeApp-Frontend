import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For eye icon
import Chef from "../../assets/chefHat.png";
import { resetPassword, validateResetPin } from '../api';

const ResetPasswordScreen = ({ route, navigation }) => {
    const [pin, setPin] = useState(['', '', '', '', '', '']); // The PIN fields
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tokenValidated, setTokenValidated] = useState(false); // Track token validation

    const handlePinChange = (index, value) => {
        const newPin = [...pin];
        newPin[index] = value.replace(/[^0-9]/g, ''); // Allow only numbers
        setPin(newPin);

        if (value && index < 5) {
            const nextInput = index + 1;
            setTimeout(() => {
                const nextInputRef = inputRefs[nextInput];
                if (nextInputRef) nextInputRef.focus();
            }, 100);
        }
    };

    const handleResetPassword = async () => {
        const resetPasswordPin = pin.join('');
        if (pin.some(value => value === '')) {
            Alert.alert('Error', 'Please fill in all PIN fields.');
            return;
        }

        if (!password || !confirmPassword) {
            Alert.alert('Error', 'Please enter and confirm your password.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(resetPasswordPin, password); // API call with PIN
            Alert.alert('Success', 'Password reset successful.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    const validateToken = async () => {
        const resetPin = pin.join('');
        if (pin.some(value => value === '')) {
            Alert.alert('Error', 'Please fill in all PIN fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await validateResetPin(resetPin);
            if (response.message === 'Pin is valid') {
                setTokenValidated(true); // If token is valid, show password fields
            } else {
                Alert.alert('Error', 'Invalid or expired pin');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to validate pin.');
        } finally {
            setLoading(false);
        }
    };

    const inputRefs = [];
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.titleContainer}>
                    <Image source={Chef} style={styles.chefIcon} />
                    <Text style={styles.title}>Chargie Recipe</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                {!tokenValidated ? (
                    <>
                        <Text style={styles.label}>Enter PIN</Text>
                        <View style={styles.pinContainer}>
                            {pin.map((value, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.pinInput}
                                    value={value}
                                    onChangeText={(text) => handlePinChange(index, text)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    ref={(ref) => (inputRefs[index] = ref)}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace' && !value && index > 0) {
                                            inputRefs[index - 1].focus();
                                        }
                                    }}
                                />
                            ))}
                        </View>
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={validateToken}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Validating...' : 'Validate PIN'}
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.label}>New Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter new password"
                                secureTextEntry={!passwordVisible}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Ionicons
                                    name={passwordVisible ? "eye-off" : "eye"}
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm new password"
                                secureTextEntry={!confirmPasswordVisible}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            >
                                <Ionicons
                                    name={confirmPasswordVisible ? "eye-off" : "eye"}
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleResetPassword}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
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
    container2: {
        position: 'absolute',
        top: 60,
        left: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chefIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pinInput: {
        height: 50,
        width: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 15,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
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
