import React from "react";
import { StyleSheet, Image, View, Dimensions, Text } from "react-native";

//size of image, caption
export default function captionedImage() {
  // export default function captionedImage(props) {     <- TS said you don't use props and unused variables are no nos. I just removed it for now
  return (
    <View>
      {/* <Image style={styles.images}></Image> */}
      {/* if you uncomment what's above, if will error saying it need to be given an image source */}
      <Text>Page2 </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  images: {
    width: Dimensions.get("window").width,
    height: 100, // <- the type of this is number | string, you had {} which won't work
  },
});
