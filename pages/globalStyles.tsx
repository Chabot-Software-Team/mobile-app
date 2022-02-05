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

  mapButtons: {
    backgroundColor: "#2ED0CF",
    
    
  },
});

export { globalStyles };
