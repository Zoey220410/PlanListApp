//import React from 'react';
//import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
//import { useNavigation } from "@react-navigation/native";
//import { TouchableOpacity } from 'react-native';
//
//const ProfileScreen = () => {
//  const navigation = useNavigation();
//  return (
//    <ScrollView style={styles.container}>
//      <View style={styles.profileSection}>
//        <Image
//          source={{ uri: 'your_profile_picture_url' }}
//          style={styles.profileImage}
//        />
//        <Text style={styles.profileName}>Zoey</Text>
//        <View style={styles.buttonGroup}>
//          <TouchableOpacity onPress={() => navigation.navigate("PersonInfo")}>
//             <Text style={{ color: "#4e8df5", fontWeight: '500' }}>
//               Edit profile
//             </Text>
//          </TouchableOpacity>
//          <TouchableOpacity onPress={() => navigation.navigate("AddFriend")}>
//             <Text style={{ color: "#f564e3", fontWeight: '500' }}>
//               Add Friends
//             </Text>
//          </TouchableOpacity>
//        </View>
//      </View>
//
//      <View style={styles.menuSection}>
//        <MenuItem iconName="lock-closed-outline" title="Security" />
//        <MenuItem iconName="notifications-outline" title="Notifications" />
//        <MenuItem iconName="settings-outline" title="Preference" />
//      </View>
//
//      <View style={styles.menuSection}>
//        <MenuItem iconName="help-circle-outline" title="Help & Support" />
//        <MenuItem iconName="document-text-outline" title="Terms and Policies" />
//      </View>
//
//      <View style={styles.menuSection}>
//        <MenuItem iconName="add-circle-outline" title="Add account" />
//      </View>
//    </ScrollView>
//  );
//};
//
//const MenuItem = ({ iconName, title }) => (
//  <View style={styles.menuItem}>
//    <Ionicons name={iconName} size={24} color="black" />
//    <Text style={styles.menuItemText}>{title}</Text>
//  </View>
//);
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//  },
//  profileSection: {
//    alignItems: 'center',
//    marginVertical: 20,
//  },
//  profileImage: {
//    width: 100,
//    height: 100,
//    borderRadius: 50,
//  },
//  profileName: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    marginVertical: 10,
//  },
//  buttonGroup: {
//    flexDirection: 'row',
//    justifyContent: 'space-around',
//    width: '100%',
//    paddingHorizontal: 20,
//  },
//  menuSection: {
//    marginVertical: 10,
//  },
//  menuItem: {
//    flexDirection: 'row',
//    alignItems: 'center',
//    paddingVertical: 10,
//    paddingHorizontal: 20,
//  },
//  menuItemText: {
//    fontSize: 18,
//    marginLeft: 15,
//  },
//});
//
//export default ProfileScreen;


import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const backImage = require("../../assets/background_signin.jpg");
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";
//import { registerIndieID } from "native-notify";
//import { processAuthError } from "../Utils";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("email = ", email);

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
       .then(() => {
                console.log("User created successfully!");
              })
              .catch((error) => {
                console.error("Error signing in: ", error);
              });
//        .then(() => registerIndieID(`${email}`, 6469, "zAbc4Qr227l0eSD1Cvpfo8"))
//        .catch((error) => {
//          processAuthError(error);
//        });
    }
  };
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
       <View style={{ flex: 1}}>

          <Image
              source={backImage}
              style={{ height: 320, width: '100%' }}
              resizeMode="cover"
          />

         <View style={{
              backgroundColor: 'white',
              marginTop: -30,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
         }}>

               <Text style={{
                     color: '#d60e45',
                     fontSize: 30,
                     fontWeight: 'bold',
                     textAlign: 'center',
                     paddingTop: 12,
                   }}>
                      Sign In{" "}
               </Text>
         </View>
         <View>
             <TextInput
               style={{
                 letterSpacing: 2,
                 backgroundColor: '#f3f3f3',
                 borderRadius: 10,
                 width: 360,
                 fontSize: 20,
                 paddingVertical: 8,
                 paddingHorizontal: 4,
                 marginHorizontal: 12,
                 marginBottom: 20,
                 top: 40
               }}
               placeholder="Enter Email"
               keyboardType="email-address"
               autoCapitalize="none"
               textContentType="emailAddress"
               value={email}
               onChangeText={setEmail}
             />
         </View>
         <View>
          <TextInput
            style={{
              letterSpacing: 2,
              backgroundColor: '#f3f3f3',
              borderRadius: 10,
              width: 360,
              fontSize: 20,
              paddingVertical: 8,
              paddingHorizontal: 4,
              marginHorizontal: 12,
              marginBottom: 20,
              top: 60
            }}
            placeholder="Enter Password"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />
          </View>

       <View>
           <TouchableOpacity
            onPress={onHandleLogin}
            style={{
                   backgroundColor: '#fac25a',
                   paddingVertical: 8,
                   borderRadius: 5,
                   marginHorizontal: 40,
                   marginTop: 20,
                   marginBottom: 12,
                   top:100,
            }} >
              <Text style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 18,
              }}>
                     Login
              </Text>
           </TouchableOpacity>
       </View>

        <View style={{
                 alignItems: 'center',
                 justifyContent: 'center',
                 top:100,
             }}>
             <Text>Don't have an account ?</Text>
             <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
               <Text style={{ color: '#d60e45', fontWeight: '500' }}>
                 Sign up
               </Text>
             </TouchableOpacity>
        </View>

    </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;