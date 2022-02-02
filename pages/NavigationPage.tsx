import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function NavigationPage() {
  const navigation = useNavigation();

  let buttons = [
    {
      name: "Movies",
      iconName: "videocam-outline",
      file: "./Calendar.js",
    },
    {
      name: "Calendar Events",
      iconName: "calendar-outline",
      file: "./Calendar.js",
    },
    {
      name: "Weather",
      iconName: "cloud-outline",
      file: "./Calendar.js",
    },
    {
      name: "Articles",
      iconName: "newspaper-outline",
      file: "./Calendar.js",
    },
    {
      name: "Staff",
      iconName: "person",
      file: "./Calendar.js",
    },
    {
      name: "Map",
      iconName: "map",
      file: "./Calendar.js",
    },
  ] as const;

  return (
    <ScrollView style={styles.container}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.name}
          style={styles.button}
          onPress={() => navigation.navigate(button.name)}
        >
          <View style={styles.iconAndTitle}>
            <Ionicons
              style={styles.icon}
              color="#2ED0CF"
              name={button.iconName}
              size={20}
            />
            <Text style={styles.buttonText}>{button.name}</Text>
          </View>
          <Ionicons
            style={styles.icon2}
            color="#2ED0CF"
            name="arrow-forward"
            size={20}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  iconAndTitle: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#1B2832",
    fontSize: 20,
    marginLeft: 20,
  },
  icon: {
    marginLeft: 30,
  },
  icon2: {
    marginRight: 30,
  },
});
