import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { login } from '../api/auth';
import { Ionicons } from '@expo/vector-icons';
import Chef from "../../assets/chefHat.png";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleLogin = async () => {
        let isValid = true;
        let newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email field cannot be empty';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password field cannot be empty';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        try {
            const data = await login({ email, password });
            navigation.navigate('Recipes', { userId: data.userId });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.titleContainer}>
                    <Image
                        source={Chef}
                        style={styles.chefIcon}
                    />
                    <Text style={styles.title}>Chargie Recipe</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry={!confirmPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
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
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                {/* TouchableOpacity for navigating to ForgotPasswordScreen */}
                <TouchableOpacity onPress={() => navigation.navigate('Forget Password')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',  // Center content vertically
        alignItems: 'center',  // Center content horizontally
        padding: 15,
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
        color: 'black',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
        position: 'relative',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        width: '100%',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        bottom: 60,
    },
    forgotPassword: {
        color: '#007BFF',
        marginTop: -5,
        marginBottom: 10,
        fontSize: 14,
        textAlign: 'left',
        marginLeft: 5,
    },
    loginButton: {
        backgroundColor: '#28a745',  // Green background color
        padding: 10,
        paddingLeft:100,
        paddingRight:100,
        borderRadius: 30,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: -10,
        marginBottom: 10,
        fontSize: 14,
    },
});

export default LoginScreen;