import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const backImage = require("../../assets/background_signin.jpg");
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";

//import { registerIndieID } from "native-notify";
//import { processAuthError } from "../Utils";
//const RegisterScreen = () => {
//  const navigation = useNavigation();
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [confirmPassword, setConfirmPassword] = useState("");
//

const SignupScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const onHandleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User created successfully!");
        })
        .catch((error) => {
          console.error("Error signing in: ", error);
        });
//    if (email !== "" && password !== "") {
//      signInWithEmailAndPassword.then(()=>{
//                                         console.log("User created successfully!");``
//                                        })
//        .then(() => registerIndieID(`${email}`, 6469, "zAbc4Qr227l0eSD1Cvpfo8"))
//        .catch((error) => {
//          processAuthError(error);
//        });
    }

  return (
//    <KeyboardAwareScrollView className="bg-black">
//     <View style={{ flex: 1, position: 'relative' }}>
//          <View style={{
//                       zIndex: 1
//                      }}>
//               <Image
//                   source={backImage}
//                   style={{ height: 320, width: '100%' }}
//                   resizeMode="cover"
//               />
//          </View>
//          <View style={{
//                       backgroundColor: 'white',
//                       height: '100%',
//                       borderTopLeftRadius: 30,
//                       borderTopRightRadius: 30,
//                       zIndex: 1,
//                     }}>
//                <Text style={{
//                          color: '#d60e45',
//                          fontSize: 30,
//                          fontWeight: 'bold',
//                          textAlign: 'center',
//                          paddingTop: 12,
//                          marginTop: 12,
//                        }}>
//                              Sign Up{" "}
//                </Text>
//          </View>
 <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
       <View style={{ flex: 1, position: 'relative' }}>
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
                     zIndex: 999,
                     top: 450,
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
                      zIndex: 999,
                      top: 450
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
                      zIndex: 999,
                      top: 450
                    }}
                    placeholder="Confirm Password"
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
                      top:500,
                    }} >
                      <Text style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'white',
                          fontSize: 18,
                      }}>
                             Register
                      </Text>
                   </TouchableOpacity>
               </View>

               <View style={{
                         alignItems: 'center',
                         justifyContent: 'center',
                         top:340,
                     }}>
                     <Text>Already have an account ?</Text>
                     <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                       <Text style={{ color: '#d60e45', fontWeight: '500' }}>
                         Sign up
                       </Text>
                     </TouchableOpacity>
               </View>

        </View>
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;