import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import { ImageType } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Assuming you're using react-navigation

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Track login status

    // Check if the user is logged in
    const checkAuthentication = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); // User is authenticated
        } else {
            setIsAuthenticated(false); // User is not authenticated
            navigation.navigate('Login'); // Redirect to login page
        }
    };

    // Call the checkAuthentication function when the component is mounted
    useEffect(() => {
        checkAuthentication();
    }, []);

    // Fetch images based on search query
    const searchImages = async () => {
        setLoading(true); // Start loading spinner
        try {
            const response = await axios.get('http://10.0.2.2:3000/api/images/search', {
                params: { query: searchQuery },
            });
            setImages(response.data.results);  // Set the fetched images
        } catch (error) {
            console.error("Error fetching images:", error);
            Alert.alert("Error", "Unable to fetch images. Please try again later.");
        }
        setLoading(false); // Stop loading spinner
    };

    // Add image to user's favorites
    const addToFavorites = async (imageId: string) => {
        try {
            const token = await AsyncStorage.getItem('token'); // Get stored JWT token
            if (!token) {
                console.log("not fav 1");
                Alert.alert('Not Authenticated', 'Please log in to add to favorites.');
                navigation.navigate('Login'); // Redirect to login page if not authenticated
                return;
            }
            console.log("fav 1");
            console.log(token);
            console.log(imageId);
            await axios.post(
                'http://10.0.2.2:3000/api/images/favorites',
                { imageId },
                { headers: { Authorization: `Bearer ${token}` } } // Attach token in the request headers
            );
            console.timeLog("fav 2");
            Alert.alert('Success', 'Added to Favorites');
        } catch (error) {
            console.error("Error adding to favorites:", error);
            console.log("not fav 2");
            Alert.alert("Error", "Unable to add to favorites. Please try again later.");
        }
    };

    return (
        <View style={styles.container}>
            <SearchBar query={searchQuery} setQuery={setSearchQuery} onSearch={searchImages} />
            
            {/* Display loading spinner while fetching images */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={images}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            {/* Display the image */}
                            <Image 
                                source={{ uri: item.urls?.small || item.urls?.regular }} // Fallback for missing small URL
                                style={styles.image}
                            />
                            {/* Image description */}
                            <Text 
                                style={styles.imageDescription} 
                                onPress={() => navigation.navigate('ImageDetail', { image: item })}
                            >
                                {item.description || "Image"}
                            </Text>
                            {/* Add to Favorites Button */}
                            <Button title="Add to Favorites" onPress={() => addToFavorites(item.id)} />
                        </View>
                    )}
                />
            )}

            {/* Navigation to Favorites screen */}
            <Button title="Go to Favorites" onPress={() => navigation.navigate('Favorites')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    imageContainer: {
        marginBottom: 15,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200, // Set a fixed height for the images
        borderRadius: 10,
    },
    imageDescription: {
        marginTop: 5,
        textAlign: 'center',
    },
});

export default HomeScreen;
