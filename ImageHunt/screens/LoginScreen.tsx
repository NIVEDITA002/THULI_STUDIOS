import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/api/auth/login', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            navigation.navigate('Home');
        } catch (err) {
            setError('Login failed. Check your credentials.');
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
            <Button title="Login" onPress={login} />
            <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
        </View>
    );
};

export default LoginScreen;
