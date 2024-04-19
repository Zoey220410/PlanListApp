import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PersonInfo = () => {
  const [name, setName] = useState('Zoey');
  const [email, setEmail] = useState('zoey089@gmail.com');
  const [password, setPassword] = useState('**********'); // Placeholder for the password
  const [dateOfBirth, setDateOfBirth] = useState('23/05/1995');
  const [country, setCountry] = useState('US');

  const handleSaveChanges = () => {
    // Here you would handle the profile update logic
    console.log('Save changes to profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image URI
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Date of Birth</Text>
        <TextInput
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Country/Region</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PersonInfo;
