import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { signUp } from '../api'; // Ensure the path is correct
import { Ionicons } from '@expo/vector-icons';
import Chef from "../../assets/chefHat.png";

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '', username: '', confirmPassword: '' });
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleSignUp = async () => {
        setErrors({ email: '', password: '', username: '', confirmPassword: '' });
        let isValid = true;

        if (!username) {
            setErrors(prev => ({ ...prev, username: 'Name is required' }));
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(username)) {
            setErrors(prev => ({ ...prev, username: 'Name must contain only letters and spaces' }));
            isValid = false;
        }

        if (!email) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors(prev => ({ ...prev, email: 'Email address is invalid' }));
            isValid = false;
        }

        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Password is required' }));
            isValid = false;
        } else if (password.length < 6) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
            isValid = false;
        }

        if (password !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            isValid = false;
        }

        if (isValid) {
            setLoading(true);
            try {
                const response = await signUp({ email, password, username });
                Alert.alert('Success', 'Account created successfully!');
                // Navigate or perform additional actions here
            } catch (error) {
                // Display the error message from the backend
                Alert.alert('Error', error.message || 'Failed to create account. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleNameChange = (text) => {
        const filteredText = text.replace(/[^A-Za-z\s]/g, '');
        setName(filteredText);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container2}>
                    <View style={styles.titleContainer}>
                        <Image
                            source={Chef}
                            style={styles.chefIcon}
                        />
                        <Text style={styles.title}>Chargie Recipe</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                value={username}
                                onChangeText={handleNameChange}
                            />
                            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                            />
                            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm your password"
                                    secureTextEntry={!confirmPasswordVisible}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                    <Ionicons
                                        name={confirmPasswordVisible ? "eye-off" : "eye"}
                                        size={24}
                                        color="black"
                                        style={styles.eyeIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleSignUp}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        left: 20,
         marginBottom: 40,
    },
    chefIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontFamily: 'Extraction BRK',
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    inputContainer: {
        width: '100%',
        paddingTop: 20,
    },
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: -10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        paddingLeft:100,
        paddingRight:100,
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
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 14,
    },
});

export default SignUpScreen;
