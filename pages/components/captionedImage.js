import React from "react";
import { StyleSheet, Image, View, text, Dimensions } from "react-native";

//size of image, caption
export default function captionedImage(props) {
  return (
    <View>
      <Image style={styles.images}></Image>
      <Text>Page2 </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  images: {
    width: Dimensions.get("window").width,
    height: {},
  },
});
