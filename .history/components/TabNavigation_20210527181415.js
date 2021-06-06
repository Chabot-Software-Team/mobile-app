import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//page imports
import Home from "../pages/Home";
import AudioPlayer from "../pages/AudioPlayer";
import NavigationPage from "../pages/NavigationPage";
import QrScan from "../pages/QrScan";

import Page1 from "../pages/articles/Page1";

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={Home} />
    </HomeStack.Navigator>
  );
}

const AudioPlayerStack = createStackNavigator();
function AudioPlayerStackScreen() {
  return (
    <AudioPlayerStack.Navigator>
      <AudioPlayerStack.Screen name='AudioPlayer' component={AudioPlayer} />
    </AudioPlayerStack.Navigator>
  );
}

const QRScanStack = createStackNavigator();
function QrScanStackScreen() {
  return (
    <QRScanStack.Navigator>
      <QRScanStack.Screen name='QrScan' component={QrScan} />
      <QRScanStack.Screen name='Page1' component={Page1} />
    </QRScanStack.Navigator>
  );
}

//dont change this
const NavigationPageStack = createStackNavigator();
function NavigationPageStackScreen() {
  return (
    <NavigationPageStack.Navigator>
      <NavigationPageStack.Screen
        name='Realtime Chabot Info'
        component={NavigationPage}
      />
    </NavigationPageStack.Navigator>
  );
}



const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeStackScreen} options={{tabBarIcon: ()=>(<Ionicons name='home-outline' size={10} />)}}/>
        <Tab.Screen name='Audio' component={AudioPlayerStackScreen} />
        <Tab.Screen name='QrScan' component={QrScanStackScreen} />
        <Tab.Screen name='More' component={NavigationPageStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
