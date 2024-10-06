import React from 'react';
import { View, TextInput, Button } from 'react-native';

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
    return (
        <View>
            <TextInput
                placeholder="Search images..."
                value={query}
                onChangeText={setQuery}
                style={{ borderWidth: 1, padding: 10, margin: 10 }}
            />
            <Button title="Search" onPress={onSearch} />
        </View>
    );
};

export default SearchBar;
