import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import PlanScreen from "./screens/planScreen";
import BinScreen from "./screens/binScreen";
import ProfileScreen from "./screens/profileScreen";
import DiscoverScreen from "./screens/discoverScreen";

import PostDetail from "./screens/PostDetail";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PersonInfo from "./screens/PersonInfo";
import AddFriend from "./screens/AddFriend";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainContainer() {
  const planName = "Plans";
  const binName = "Recycle Bin";
  const discoverName = "Discover";
  const profileName = "Profile";

  const BottomTabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={planName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === planName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === binName) {
              iconName = "flower";
            } else if (rn === discoverName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === profileName) {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            paddingBottom: 5,
            fontSize: 10,
          },
          tabBarStyle: {
            padding: 5,
            height: 90,
          },
        })}
      >
        <Tab.Screen name={planName} component={PlanScreen} />
        <Tab.Screen name={binName} component={BinScreen} />
        <Tab.Screen name={discoverName} component={DiscoverScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="PersonInfo" component={PersonInfo} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
