import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import PlanScreen from "./screens/planScreen";
import BinScreen from "./screens/binScreen";
import ProfileScreen from "./screens/profileScreen";
import DiscoverScreen from "./screens/add";

//Screen names
const planName = "Plans";
const discoverName = "Discover";
const binName = "Recycle Bin";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
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

            // You can return any component that you like here!
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
    </NavigationContainer>
  );
}
