import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddFriend = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = () => {
    // Perform the search. This is just a mock-up for demonstration purposes.
    // In a real app, you would make an API call to your backend.
    if (searchTerm.toLowerCase() === 'riley') {
      setResults({ id: 1, name: 'Riley' });
    } else {
      setResults(null);
    }
  };

  const sendFriendRequest = () => {
    // Send friend request logic
    console.log('Friend request sent to:', results.name);
    // This would likely involve an API call to your backend.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Friend</Text>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Enter friend's name"
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      {results && (
        <View style={styles.resultContainer}>
          <Ionicons name="person-outline" size={24} style={styles.icon} />
          <Text style={styles.resultText}>{results.name}</Text>
          <TouchableOpacity style={styles.button} onPress={sendFriendRequest}>
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 8,
  },
  resultText: {
    flex: 1,
  },
  button: {
    backgroundColor: 'pink',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddFriend;
