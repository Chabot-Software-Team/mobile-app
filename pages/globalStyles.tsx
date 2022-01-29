import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const globalStyles = StyleSheet.create({
  articleImages: {
    width: Dimensions.get("window").width,
  },
  headerText: {},
  subHeaderText: {},
  bodyText: {
    fontSize: 20,
  },
  captionText: {
    fontSize: 20,
    alignSelf: "center",
  },

  buttons: {},
});

export { globalStyles };
