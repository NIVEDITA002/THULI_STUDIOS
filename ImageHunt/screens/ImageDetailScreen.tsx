import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { ImageType } from '../types';

interface ImageDetailProps {
    route: {
        params: {
            image: ImageType;
        };
    };
}

const ImageDetailScreen: React.FC<ImageDetailProps> = ({ route }) => {
    const { image } = route.params;

    return (
        <View>
            <Image source={{ uri: image.urls.regular }} style={{ width: '100%', height: 200 }} />
            <Text>{image.description || "Image Description"}</Text>
            <Button title="Add to Favorites" onPress={() => console.log("Add to favorites functionality here")} />
        </View>
    );
};

export default ImageDetailScreen;
