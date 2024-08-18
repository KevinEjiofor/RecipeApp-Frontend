import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Chef from "../../assets/chefHat.png";

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Image
                        source={Chef}
                        style={styles.chefIcon}
                    />
                    <Text style={styles.title}>Chargie Recipe</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
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
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 150,
        width: '80%',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Extraction BRK',
    },
});

export default WelcomeScreen;
