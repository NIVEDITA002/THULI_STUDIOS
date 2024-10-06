import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const SignupScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    console.log('Email:', email);
    console.log('Password:', password);

    const signup = async () => {
        try {
            console.log('Email being sent:', email);
            console.log('Password being sent:', password);
            const response = await axios.post('http://10.0.2.2:3000/api/auth/signup', {
                email,  // Ensure you replace this with actual user input
                password,    // Ensure you replace this with actual user input
            });
            console.log('Signup Success:', response.data);
            navigation.navigate('Login');
        } catch (err) {
            console.error('Signup Error:', error);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            {error && <Text>{error}</Text>}
            <Button title="Signup" onPress={signup} />
        </View>
    );
};

export default SignupScreen;
