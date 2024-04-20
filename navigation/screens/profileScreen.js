import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const backImage = require("../../assets/favicon.png");
import { useNavigation } from "@react-navigation/native";
import { signIn, signOutUser } from "../../firebase-backend/userController";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";
//import { registerIndieID } from "native-notify";
//import { processAuthError } from "../Utils";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser, userAvatarUrl, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );

  const onHandleLogin = async () => {
    if (email !== "" && password !== "") {
      const user = await signIn(email, password);
      setUser(user);
      console.log(user);
    }
  };

  const handleLogout = async () => {
    await signOutUser();
    setUser(null);
  };

  if (user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View>
          <Text>Welcome, {user.email}!</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#fac25a",
              paddingVertical: 8,
              borderRadius: 5,
              marginHorizontal: 40,
              marginTop: 20,
              marginBottom: 12,
              top: 100,
            }}
            onPress={handleLogout}
          >
            <Text style={{ textAlign: "center" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
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
            Sign In{" "}
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
        <View></View>
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
          <TouchableOpacity
            onPress={onHandleLogin}
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
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            top: 100,
          }}
        >
          <Text>Don't have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#d60e45", fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;
