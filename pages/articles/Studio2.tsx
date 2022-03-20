import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

import CaptionedImage from "../../components/CaptionedImage";

export default function Studio2() {
  return (
    <ScrollView>
      {/*Headder*/}
      <CaptionedImage
        style={{ width: 100, height: 100 }}
        text1={"hello"}
        uri={
          "https://chabotspace.org/wp-content/uploads/2022/02/thumbnail_Image-13-e1644261252348.jpg"
        }
      ></CaptionedImage>
      <CaptionedImage
        style={{ width: 200, height: 100 }}
        text1={"hello"}
        text2={"bye"}
        uri={
          "https://chabotspace.org/wp-content/uploads/2018/10/191-1-468x314.jpg"
        }
      ></CaptionedImage>
      <CaptionedImage text2={"bye"}></CaptionedImage>
      <Text>STUDIO 2: GOING THE DISTANCE</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://chabotspace.org/wp-content/uploads/2019/08/Entrance.png",
        }}
      ></Image>
      <Text>
        Explore how humans are expanding our boundaries by moving farther into
        the Universe than ever before. With inspiration and content provided by
        NASA’s Ames Research Center, Caltech’s Jet Propulsion Laboratory,
        Planet, and SpaceX, the exhibit traces our journey through the cosmos,
        and where we are headed.
      </Text>

      <Image
        style={styles.image}
        source={{
          uri: "https://chabotspace.org/wp-content/uploads/2018/10/191-1-468x314.jpg",
        }}
      ></Image>
      <Text>
        Experience the sights and sounds of Chabot’s Mission Control, modeled
        after the Jet Propulsion Laboratory’s Mission Control. Step up to any
        station to be the next Flight Director! Pilot a rover across our very
        own Chaos Terrain, a Mars-like surface scattered with knobs and cones of
        rocks!
      </Text>

      <Image
        style={styles.image}
        source={{
          uri: "https://chabotspace.org/wp-content/uploads/2019/08/06-468x314.jpg",
        }}
      ></Image>
      <Text>
        See out-of-this world objects, from the space program workhorse, an
        authentic 7K-OK Russian Soyuz Descent Module, to a Dove Cube Satellite
        Model, an example of the next generation of Nano satellites used to
        gather Earth imagery from space.
      </Text>

      <Image
        style={styles.image}
        source={{
          uri: "https://chabotspace.org/wp-content/uploads/2019/08/19-468x314.jpg",
        }}
      ></Image>
      <Text>
        Imagine what your career will be in space —a rover pilot? A martian
        geologist? A space suit designer? Learn about intriguing new jobs for
        the next generation of space exploration.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
