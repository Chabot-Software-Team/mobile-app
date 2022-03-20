import React from "react";
import { StyleSheet, Image, View, Dimensions, Text } from "react-native";
import { globalStyles } from "../pages/globalStyles";

export default function CaptionedImage(props) {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerText}>{props.headerText}</Text>
      <Text style={globalStyles.subHeaderText}>{props.subHeaderText}</Text>
      <Image
        style={styles.images}
        source={{
          uri: props.uri,
        }}
      ></Image>

      <Text style={globalStyles.bodyText}>{props.bodyText}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  images: {
    width: Dimensions.get("window").width,
    height: 100, // <- the type of this is number | string, you had {} which won't work
  },
  container: {
    flex: 1,
  },
});
