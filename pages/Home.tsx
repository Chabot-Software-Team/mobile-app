import { useFonts } from "expo-font";
import React from "react";
import { Text, View, Image, Dimensions, StyleSheet } from "react-native";
import HomeCarousel from "../components/HomeCarousel";

function Home() {
  const win = Dimensions.get("window");

  const ratio1 = win.width / 1125; //1125 is actual image width

  const ratio2 = (win.width * 0.5) / 1200;

  const styles = StyleSheet.create({
    imageStyle: {
      width: win.width,
      height: 552 * ratio1, //552 is actual height of image
    },
    flex: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      backgroundColor: "white",
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#1B2832",
    },
    logo: {
      width: win.width * 0.5,
      height: 483 * ratio2,
    },
    title: {
      fontFamily: "Futura",
      color: "#1B2832",
      padding: 30,
      fontSize: 20,
    },
  });

  return (
    <View style={styles.flex}>
      <View style={styles.topBar}>
        <Image
          style={styles.logo}
          source={require("../assets/images/chabot_logo.png")}
        ></Image>
      </View>
      <Text style={styles.title}>Upcoming Events</Text>
      <HomeCarousel />
      <Image
        style={styles.imageStyle}
        source={require("../assets/images/trees.png")}
      />
    </View>
  );
}

export default Home;
