import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { signUp } from "../../firebase-backend/userController";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";

const backImage = require("../../assets/background_signup.jpg");

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, setUser, userAvatarUrl, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );

  const onHandleRegister = async () => {
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    if (email !== "" && password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        Alert.alert("Password does not match");
      } else {
        const user = await signUp(email, password);
        setUser(user);
        navigation.navigate("BottomTabNavigator");
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={backImage}
          style={{ height: 200, width: "100%" }}
          resizeMode="cover"
        />

        <View
          style={{
            backgroundColor: "white",
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text
            style={{
              color: "#d60e45",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 12,
            }}
          >
            Sign Up{" "}
          </Text>
        </View>
        <View>
          <TextInput
            style={{
              letterSpacing: 2,
              backgroundColor: "#f3f3f3",
              borderRadius: 10,
              width: 360,
              fontSize: 20,
              paddingVertical: 8,
              paddingHorizontal: 4,
              marginHorizontal: 12,
              marginBottom: 20,
              top: 40,
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
              backgroundColor: "#f3f3f3",
              borderRadius: 10,
              width: 360,
              fontSize: 20,
              paddingVertical: 8,
              paddingHorizontal: 4,
              marginHorizontal: 12,
              marginBottom: 20,
              top: 60,
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
              backgroundColor: "#f3f3f3",
              borderRadius: 10,
              width: 360,
              fontSize: 20,
              paddingVertical: 8,
              paddingHorizontal: 4,
              marginHorizontal: 12,
              marginBottom: 20,
              top: 60,
            }}
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={onHandleRegister}
            style={{
              backgroundColor: "#fac25a",
              paddingVertical: 8,
              borderRadius: 5,
              marginHorizontal: 40,
              marginTop: 20,
              marginBottom: 12,
              top: 100,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            top: 120,
          }}
        >
          <Text>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ color: "#d60e45", fontWeight: "500" }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;
