import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { globalStyles } from "../globalStyles";

import { useFonts } from "expo-font";

export default function Studio1() {
  /*
  const [loaded] = useFonts({
    Futura: require("futur.ttf"),
  });

  if (!loaded) {
    return null;
  }
*/
  return (
    <ScrollView>
      <Text style={styles.paragraphText}>Studio1</Text>
      <Text>Studio1</Text>
      <Text style={{ fontFamily: "Futura", fontSize: 30 }}>Futura</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  paragraphText: {
    fontFamily: "Futura",
  },
});
