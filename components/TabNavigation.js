import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";

//page imports
import Home from "../pages/Home";
import AudioPlayer from "../pages/AudioPlayer";
import NavigationPage from "../pages/NavigationPage";
import QrScan from "../pages/QrScan";

const Tab = createBottomTabNavigator();

const NavigationPageStack = createStackNavigator();

function NavigationPageStackScreen() {
  return (
    <NavigationPageStack.Navigator>
      <NavigationPageStack.Screen
        name='NavigationPage'
        component={NavigationPage}
      />
      <NavigationPageStack.Screen name='QrScan' component={QrScan} />
    </NavigationPageStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Audio' component={AudioPlayer} />
        <Tab.Screen name='More' component={NavigationPageStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
