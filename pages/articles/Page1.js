import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function Page1() {
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.bodyText}>
        Page1 Page1Page1Page1Page1Page1Page1 Page1
        Page1Page1Page1Page1Page1Page1Page1Page1 Page1 Page1 Page1 Page1 Page1
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 60,
  },
  bodyText: {
    fontSize: 40,
  },
  images: {},
  buttons: {},
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
});
