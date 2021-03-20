import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function NavigationPage(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => alert("hello")}>
          <Ionicons name='play-skip-forward-outline' size={20} />
          <Text>Articles</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("hello")}>
          <Ionicons name='play-skip-forward-outline' size={20} />
          <Text>Articles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => alert("hello")}>
          <Ionicons name='play-skip-forward-outline' size={20} />
          <Text>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("hello")}>
          <Ionicons name='play-skip-forward-outline' size={20} />
          <Text>Articles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
