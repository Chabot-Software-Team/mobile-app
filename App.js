import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "./components/TabNavigation";

export default function App() {
  return <TabNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
