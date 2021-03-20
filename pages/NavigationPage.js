import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function NavigationPage() {
  const navigation = useNavigation();

  const buttons = [
    {
      name: "Movies",
      iconName: "videocam-outline"
    },
    {
      name: "Calendar Events",
      iconName: "calendar-outline"
    },
    {
      name: "Weather",
      iconName: "cloud-outline"
    },
    {
      name: "Articles",
      iconName: "newspaper-outline"
    }
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Movies')}>
        <Text style={styles.buttonText}>{button.name}</Text>
        <Ionicons style={styles.icon} name={button.iconName} size={20} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button:{
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    width: "80%",
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,  
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText:{
    fontSize: 20,
    marginLeft: 70,
    marginRight: 10
  },
  icon:{
    marginRight: 30
  }
});
