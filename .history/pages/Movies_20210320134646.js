import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import template movie component
import Movie from "./movieDetails/Movie1";

export default function Movies({ names, descriptions, startTimes }) {
  return (
    <View>
      <Text>Movies</Text>

      <Movie />
    </View>
  );
}
