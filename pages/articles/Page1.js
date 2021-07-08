import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { globalStyles } from "../globalStyles";

import CaptionedImage from "../components/CaptionedImage";

export default function Page1() {
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={globalStyles.bodyText}>
        Page1 Page1Page1Page1Page1Page1Page1 Page1
        Page1Page1Page1Page1Page1Page1Page1Page1 Page1 Page1 Page1 Page1 Page1
      </Text>
      <CaptionedImage
        source={require("C:Users/aidan/Documents/mobile-app/assetsimages8-inch-Telescope-Leah.jpg")}
        caption={"captioned text"}
      ></CaptionedImage>
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
    marginHorizontal: 30,
  },
});
