import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { Slider } from "react-native-elements";

import { Ionicons } from "@expo/vector-icons";

import { Audio } from "expo-av";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const sound = new Audio.Sound();

// Import JSON
import * as data from './songs.json';

export default function AudioPlayer() {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState();
  const [sliderValue, setSliderValue] = useState(50);
  const [playPauseIcon, setPlayPauseIcon] = useState("play-circle-outline");

//sound.setPositionAsync(time in miliseconds)

  class SongHandler {
    constructor(){
      this.songs = [];
      this.currSong = 0;
      // read JSON and add song obj
    }
    addSongs(){
      
    }
    getNextSrc(){
      // next song
      currSong++;
      //get next song src
      return this.songs[currSong].src;
    }
  }

  async function loadAudio() {
    await sound.loadAsync(require("../assets/audio/Roar.mp3"));
    console.log("Audio loaded");
    setPlaybackStatus(sound.getStatusAsync());
    alert(sound.durationMillis);
  }

  async function goToTime (time){
    if (isPlaying == true){
      console.log("moving to time")
      sound.playFromPositionAsync(time);
    }
    else {
      console.log("goToTime failed")
    }
  };

  async function handleNext(){
    await sound.unloadAsync();
    await sound.loadAsync((require("../assets/audio/show.mp3")));
    setPlaybackStatus(sound.getStatusAsync()); 
  }

  
  loadAudio();
  
  //sound.setOnPlaybackStatusUpdate();
  
  const handlePausePress = async () => {
    try {
      if (isPlaying == true) {
        await sound.pauseAsync();
        setPlayPauseIcon('play-circle-outline');
        setIsPlaying(false);
      } else if (isPlaying == false) {
        await sound.playAsync();
        setPlayPauseIcon('pause-circle-outline');
        setIsPlaying(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleForwardPress = async () =>{};


  function setPosition(value){
    alert("You changed postition to " + value);
  }

  //Takes a value of time in milliseconds and converts it into a minutes seconds string like 3:43
  function millisToTime(millis) {
    
    let seconds = Math.floor(millis / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if (seconds == 0) {
      seconds = "00";
    } else if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  function renderDuration() {
    try {
      return millisToTime(playbackStatus.positionMillis);
    } catch (error) {
      console.log(error);
    }
  }
  function renderPosition() {
    try {
      return millisToTime(playbackStatus.durationMillis);
    } catch (error) {
      console.log(error);
    }
  }
  
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}></View>
      <View style={{ flex: 5, justifyContent: "center" }}>
        <Image
          style={styles.imagePosition}
          source={require("../assets/images/hairGod.jpg")}
        ></Image>
        <Text style={{ alignSelf: "center", justifyContent: "center" }}>
          Audio Branch {sliderValue} {sound.positionMillis} {playbackStatus.durationMillis}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 20 }}>

          <Slider value = {sliderValue} onValueChange = {(sliderValue) =>setSliderValue(sliderValue)} minimumValue={0} maximumValue={100} step = {1} thumbTintColor='#04A5BA' />

        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={{ flex: 0.5, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ paddingLeft: 20 }}>{"start"}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ paddingRight: 20 }}>{"end"}</Text>
        </View>
      </View>

      <View style={styles.iconView}>
        <TouchableOpacity
          onPress={() => {
            goToTime(50000);
          }}
        >
          <Ionicons name='play-skip-back-outline' size={windowWidth / 6} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePausePress()}>
          <Ionicons name='play-back-outline' size={windowWidth / 6} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePausePress()}>
          <Ionicons name= {playPauseIcon} size={windowWidth / 6} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePausePress()}>
          <Ionicons name='play-forward-outline' size={windowWidth / 6} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNext()}>
          <Ionicons name='play-skip-forward-outline' size={windowWidth / 6} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ paddingLeft: 20 }}
            onPress={() => alert("hello")}
          >
            <Ionicons name='caret-up-circle-outline' size={windowWidth / 8} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ paddingRight: 20 }}>1x</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePosition: {
    width: windowWidth / 1.25,
    height: windowWidth / 1.25,
    alignSelf: "center",
  },
  iconView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },

  toggleButton: {
    flex: 1,
    backgroundColor: "#04A5BA",
    padding: 20,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
});
