import React from "react";
import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";

import axios from 'axios';
import cheerio from 'cheerio';

// import template movie component
import Movie from "./movieDetails/Movie1";



export default function Movies() {

  // // Movies start empty
  // const [movies, setMovies] = useState([]);


  // const getMovies = async () => {
  //   async function fetchHTML(url) {
  //     const { data } = await axios.get(url)
  //     return cheerio.load(data)
  //   }

  //   const $ = await fetchHTML("https://example.com")

  //   const data = await response.json();
  //   setMovies(); //set to movie array
  //   console.log();
  // };


  return (
    <View>
      <Text>Movies</Text>
      {/* {movies.map((movie) => (
        <Movie
          name={movie.name}
          description={movie.description}
          startTime={movie.startTime}
          endTime={movie.endTime}
        />
      ))} */}
    </View>
  );
}
