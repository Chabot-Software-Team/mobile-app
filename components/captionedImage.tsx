import React from "react";
import { StyleSheet, Image, View, Dimensions, Text } from "react-native";
import { globalStyles } from "../pages/globalStyles";

export default function CaptionedImage() {
  return (
    <View>
      <Text style={globalStyles.headerText}>Studio 3</Text>
      <Image
        style={globalStyles.articleImages}
        source={{
          uri: "https://chabotspace.org/wp-content/uploads/2022/02/thumbnail_Image-13-e1644261252348.jpg",
        }}
      />
      <Text style={globalStyles.subHeaderText}>Located in Astronomy Hall</Text>
      <Text style={globalStyles.headerText}>
        WHAT DOES A HOME LOOK LIKE ON MARS?{" "}
      </Text>
      <Text style={globalStyles.bodyText}>
        Join us for Mars Habitat Building, where we’ll imagine what it would be
        like to build structures that can withstand the Martian atmosphere and
        support the needs of humans inhabiting this alien world.{" "}
      </Text>
      <Text style={globalStyles.bodyText}>
        This collaborative building space invites our community to tinker
        together, contribute to something larger than ourselves and share ideas
        with other makers. Connect the process of tinkering to the work of
        researching the solar system, planning new missions and going to space.{" "}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  images: {
    width: Dimensions.get("window").width,
    height: 100, // <- the type of this is number | string, you had {} which won't work
  },
});
