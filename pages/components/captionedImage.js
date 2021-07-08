import React from "react";
import { StyleSheet, Image, View, Text, Dimensions } from "react-native";
import { globalStyles } from "../globalStyles";

//size of image, caption
export default function CaptionedImage(props) {
  const windowWidth = Dimensions.get("window").width;
  //const scale = {props.scale};
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          resizeMode: "contain",
          width: windowWidth,
          padding: 20,
        }}
        source={props.source}
      ></Image>
      <Text style={globalStyles.captionText}> {props.caption} </Text>
    </View>
  );
}
// const styles = StyleSheet.create({
//   images: {
//     width: Dimensions.get("window").width,
//     height: {},
//   },
// });
