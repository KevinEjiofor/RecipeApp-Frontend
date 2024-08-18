# RecipeApp-Frontend


This project involves building a mobile application for the "Chargie Recipe" platform using React Native. The app includes several key screens, each designed to facilitate user interactions and enhance the overall user experience.

## Screens and Components

### 1. **Sign Up Screen**
   - **Purpose**: Allows new users to create an account on the Chargie Recipe platform.
   - **Features**:
     - **Input Fields**: For full name, email, password, and password confirmation.
     - **Validation**: Ensures all fields are correctly filled and passwords match.
     - **Error Handling**: Displays error messages for invalid inputs or issues with registration.
     - **Loading State**: Shows a loading indicator while the sign-up request is being processed.
     - **Successful Registration**: Upon successful registration, the user receives a success message, and the JWT token is stored for authentication.

### 2. **Login Screen**
   - **Purpose**: Allows users to log in to their existing accounts.
   - **Features**:
     - **Input Fields**: For email and password.
     - **Validation**: Ensures the email and password fields are correctly filled.
     - **Error Handling**: Displays error messages for incorrect credentials or login issues.
     - **Loading State**: Shows a loading indicator while the login request is being processed.
     - **Successful Login**: Upon successful login, the user is redirected to the home screen, and the JWT token is stored for authentication.

### 3. **Forgot Password Screen**
   - **Purpose**: Allows users to request a password reset if they forget their current password.
   - **Features**:
     - **Input Field**: For entering the email address associated with the account.
     - **Error Handling**: Displays messages if the email is not associated with any account or if there are issues with the request.
     - **Success Message**: Informs users when the password reset email has been sent.

### 4. **Reset Password Screen**
   - **Purpose**: Allows users to reset their password using a reset token sent to their email.
   - **Features**:
     - **Input Fields**: For entering the new password and confirming it.
     - **Validation**: Ensures the new password meets security requirements and matches the confirmation password.
     - **Error Handling**: Displays messages for invalid tokens or mismatched passwords.
     - **Success Message**: Informs users when the password has been successfully reset.

### 5. **Welcome Screen**
   - **Purpose**: The initial screen users see when they open the app.
   - **Features**:
     - **Title**: Displays the app's name and a welcoming message.
     - **Buttons**: For navigating to the sign-up and login screens.
     - **Background Image**: Features a background image or icon to enhance the visual appeal.

## Authentication and Token Management

- **JWT Token Handling**: Both the sign-up and login screens handle JWT tokens. Upon successful authentication, the token is stored in `AsyncStorage` and used for subsequent authenticated API requests.
- **Error Handling**: Comprehensive error handling ensures users are informed of issues with their input or requests.

## Additional Information

- **Styling**: The app utilizes a custom font and has a consistent styling theme across all screens.
- **Responsiveness**: The design is optimized for various device sizes and orientations.

