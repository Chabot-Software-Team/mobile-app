import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useFonts } from "expo-font";
/*
const [loaded] = useFonts({
  Futura: require("../assets/fonts/futur.ttf"),
});
*/
const globalStyles = StyleSheet.create({
  articleImages: {
    width: Dimensions.get("window").width,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 20,
  },
  captionText: {
    fontSize: 20,
    alignSelf: "center",
  },
  paragraphText: {
    fontFamily: "Futura",
  },

  mapButtons: {
    backgroundColor: "#2ED0CF",
  },
});

export { globalStyles };
