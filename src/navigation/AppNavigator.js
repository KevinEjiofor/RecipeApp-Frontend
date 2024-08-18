import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RecipesScreen from '../screens/RecipesScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';


const Stack = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Home" component={WelcomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: true}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: true}} />
            <Stack.Screen name="Forget Password" component={ForgotPasswordScreen} options={{headerShown:true}} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{headerShown:true}} />
            <Stack.Screen name="Recipes" component={RecipesScreen} options={{headerShown: false}} />
            <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} options={{headerShown: false}} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
