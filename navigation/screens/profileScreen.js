import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'your_profile_picture_url' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Zoey</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={() => navigation.navigate("personInfo")}>
             <Text style={{ color: "#4e8df5", fontWeight: '500' }}>
               Edit profile
             </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("addFriend")}>
             <Text style={{ color: "#f564e3", fontWeight: '500' }}>
               Add Friends
             </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuSection}>
        <MenuItem iconName="lock-closed-outline" title="Security" />
        <MenuItem iconName="notifications-outline" title="Notifications" />
        <MenuItem iconName="settings-outline" title="Preference" />
      </View>

      <View style={styles.menuSection}>
        <MenuItem iconName="help-circle-outline" title="Help & Support" />
        <MenuItem iconName="document-text-outline" title="Terms and Policies" />
      </View>

      <View style={styles.menuSection}>
        <MenuItem iconName="add-circle-outline" title="Add account" />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ iconName, title }) => (
  <View style={styles.menuItem}>
    <Ionicons name={iconName} size={24} color="black" />
    <Text style={styles.menuItemText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  menuSection: {
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
  },
});

export default ProfileScreen;
