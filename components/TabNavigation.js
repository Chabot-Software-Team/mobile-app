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
import Calendar from "../pages/Calendar.js";

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

const CalendarStack = createStackNavigator();
function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name='Calendar' component={Calendar} />
    </CalendarStack.Navigator>
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

// function Calendar() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Calendar" component={Calendar} />
//       {/* <Tab.Screen name="Messages" component={Messages} /> */}
//     </Tab.Navigator>
//   );
// }



const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeStackScreen} options={{tabBarIcon: ()=>(<Ionicons name='home-outline' size={20} />)}}/>
        <Tab.Screen name='Audio' component={AudioPlayerStackScreen} options={{tabBarIcon: ()=>(<Ionicons name='headset-outline' size={20} />)}}/>
        <Tab.Screen name='QrScan' component={QrScanStackScreen} options={{tabBarIcon: ()=>(<Ionicons name='qr-code-outline' size={20} />)}}/>
        <Tab.Screen name='More' component={NavigationPageStackScreen} options={{tabBarIcon: ()=>(<Ionicons name='add-outline' size={20} />)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
