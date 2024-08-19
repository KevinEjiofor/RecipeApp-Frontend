import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Chef from "../../assets/chefHat.png";
import { resetPassword, validateResetPin } from '../api'; // Ensure these functions are correctly implemented

const ResetPasswordScreen = ({ route, navigation }) => {
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tokenValidated, setTokenValidated] = useState(false);

    const [pinError, setPinError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const inputRefs = useRef([]);

    const handlePinChange = (index, value) => {
        const newPin = [...pin];
        newPin[index] = value.replace(/[^0-9]/g, '');
        setPin(newPin);

        if (value && index < 5) {
            setTimeout(() => {
                inputRefs.current[index + 1]?.focus();
            }, 100);
        }
    };

    const handleResetPassword = async () => {
        const resetPin = pin.join('');
    
        let hasError = false;
    
        if (pin.some(value => value === '')) {
            setPinError('Please fill in all PIN fields.');
            hasError = true;
        } else {
            setPinError('');
        }
    
        if (!password || !confirmPassword) {
            setPasswordError('Please enter and confirm your password.');
            hasError = true;
        } else {
            setPasswordError('');
        }
    
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            hasError = true;
        } else {
            setConfirmPasswordError('');
        }
    
        if (hasError) return;
    
        setLoading(true);
        try {
            const response = await resetPassword({ resetPin, newPassword: password });
            if (response.message === 'Password reset successful') {
                navigation.navigate('Login');
            } else {
                setPasswordError(response.message || 'Failed to reset password.');
            }
        } catch (error) {
            setPasswordError(error.message || 'Failed to reset password.');
        }
        
        // try {
            
        //     console.log("Payload:", { resetPin, newPassword: password });
    
        //     const response = await resetPassword({ resetPin, newPassword: password });
    
        //     if (response.message === 'Password reset successful') {
        //         navigation.navigate('Login');
        //     } else {
        //         setPasswordError(response.message || 'Failed to reset password.');
        //     }
        // } catch (error) {
        //     setPasswordError(error.message || 'Failed to reset password.');
        // } finally {
        //     setLoading(false);
        // }
    };
    
    const validateToken = async () => {
        const resetPin = pin.join('');
        if (pin.some(value => value === '')) {
            setPinError('Please fill in all PIN fields.');
            return;
        } else {
            setPinError('');
        }

        setLoading(true);
        try {
            const response = await validateResetPin(resetPin);
            if (response.message === 'Pin is valid') {
                setTokenValidated(true);
            } else {
                setPinError('Invalid or expired pin');
            }
        } catch (error) {
            setPinError('Failed to validate pin.');
        } finally {
            setLoading(false);
        }
    };

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
                                <View key={index} style={styles.pinInputContainer}>
                                    <TextInput
                                        style={styles.pinInput}
                                        value={value}
                                        onChangeText={(text) => handlePinChange(index, text)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        ref={ref => inputRefs.current[index] = ref}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === 'Backspace' && !value && index > 0) {
                                                inputRefs.current[index - 1]?.focus();
                                            }
                                        }}
                                    />
                                </View>
                            ))}
                        </View>
                        {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}
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
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

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
                        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

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
    pinInputContainer: {
        flex: 1,
        alignItems: 'center',
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
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default ResetPasswordScreen;
