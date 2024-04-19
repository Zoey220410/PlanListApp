import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';

const personInfo = () => {
  const [name, setName] = useState('Zoey');
  const [email, setEmail] = useState('zoey089@gmail.com');
  const [password, setPassword] = useState('**********'); // This should be handled securely
  const [dateOfBirth, setDateOfBirth] = useState('23/05/1995');
  const [country, setCountry] = useState('US');

  const onSaveChanges = () => {
    // Handle the save changes action
    console.log('Save changes');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profilePicContainer}>
          <Image
            source={{ uri: 'your_profile_picture_uri' }} // Replace with your profile picture uri
            style={styles.profilePic}
          />
          <View style={styles.addIconContainer}>
            <Text style={styles.addIconText}>+</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        {/* Implement date picker for date of birth */}
        <TextInput
          style={styles.input}
          onChangeText={setDateOfBirth}
          value={dateOfBirth}
          placeholder="Date of Birth"
        />
        {/* Implement country picker or another TextInput for country */}
        <TextInput
          style={styles.input}
          onChangeText={setCountry}
          value={country}
          placeholder="Country/Region"
        />
        <TouchableOpacity style={styles.saveButton} onPress={onSaveChanges}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addIconContainer: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  addIconText: {
    fontSize: 20,
    color: 'black',
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
  },
});

export default personInfo;
