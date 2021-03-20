import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import template movie component
import Movie from "./movieDetails/Movie1";

export default function Movies({ movies }) {
  return (
    <View>
      <Text>Movies</Text>
      {movies.map((movie) => (
        <Movie
          name={movie.name}
          description={movie.description}
          startTime={movie.startTime}
          endTime={movie.endTime}
        />
      ))}
    </View>
  );
}
