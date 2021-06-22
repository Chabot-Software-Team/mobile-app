import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Image } from 'react-native';
  
import { Audio } from 'expo-av';

import { Ionicons } from "@expo/vector-icons";

import {PlaylistItem, playlist} from "./Songs";

// soundObject.loadAsync(source, initialStatus = {}, downloadFirst = true)
// soundObject.unloadAsync()
// soundObject.getStatusAsync()
// soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
// soundObject.setStatusAsync(statusToSet)
// soundObject.playAsync()
// soundObject.replayAsync()
// soundObject.pauseAsync()
// soundObject.stopAsync()
// soundObject.setPositionAsync(millis)
// soundObject.setRateAsync(value, shouldCorrectPitch, pitchCorrectionQuality)
// soundObject.setVolumeAsync(value)
// soundObject.setIsMutedAsync(value)
// soundObject.setIsLoopingAsync(value)
// soundObject.setProgressUpdateIntervalAsync(millis)

//don't move this out of global scope
let currentIndex = 0;

export default function App() {
  const [sound, setSound] = useState(null); //holds the sound object
  const [isPlaying, setIsPlaying] = useState(false); //allows the handlePress function to know whether to play or pause
  const [status, setStatus] = useState(); //holds the playback status of the sound object
  const [isLoaded, setIsLoaded] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  

  
  
  function millisToTime(millis) {
    //Takes a value of time in milliseconds and converts it into a minutes seconds string like 3:43
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

  const handlePress = () =>  {
    if (sound == null){
      loadSound(playlist[currentIndex].getSongSource())
      handlePress()
    }
    else {
      if(isPlaying){
        pauseSound()
      }
      else{
        playSound()
      }
    }
    
  }

  
  async function loadSound(source, playOnLoad) {
    console.log("loadSound called");

    const playbackObject = new Audio.Sound();
    
    await playbackObject.loadAsync(
      source, {shouldPlay: playOnLoad}
    );

    console.log("Sound source loaded " + source)

    playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdateFunc);

    await setSound(playbackObject);
    
    /*allows the playback status to be accessed using the status hook outside 
    the scopt of this funciton*/
    let AVPlaybackStatus = await sound.getStatusAsync();
    setStatus(AVPlaybackStatus)      

    
    
  }

  
  const onPlaybackStatusUpdateFunc = playbackStatus =>{
    /* onPlaybackStatusUpdateFunc calls any time the playback status updates, 
  or periodically based on the progressUpdateIntervalMillis property
  */
    
    setStatus(playbackStatus);
    setIsLoaded(true);
    console.log("Playback status updated")
    if (playbackStatus.didJustFinish == true){
      skip(1)
    }
  };

  useEffect(() => {


    loadSound(playlist[currentIndex].getSongSource(), false)
  }, [])

  useEffect(() => {console.log("currentIndex is now " + currentIndex)}, [currentIndex])


  const reloadStatus = async () =>{
    let AVPlaybackStatus = await sound.getStatusAsync();
    //console.log(AVPlaybackStatus)
    setStatus(AVPlaybackStatus)
    }

  async function playSound() {
    
    console.log('playSound Called');
    await sound.playAsync(); 
    setIsPlaying("Sound playing " + true)
    console.log(status.isPlaying);
    reloadStatus()
    // setIsPlaying(true)
    // console.log(sound.isPlaying);
  }
  
  async function pauseSound(){
    console.log("pauseSound Called")
    await sound.pauseAsync();
    setIsPlaying(false)
    console.log("Sound playing " + status.isPlaying);
    reloadStatus()
    // setIsPlaying(false)
  };


  async function advance(seconds){
    let currentPosition = status.positionMillis;
    await sound.setPositionAsync(currentPosition + (seconds * 1000));
    reloadStatus()
    console.log("Position is " + status.positionMillis);
  }

  async function speedUp(increment){
    let currentRate = status.rate;
    await sound.setRateAsync(currentRate + increment);
    //let AVPlaybackStatus = await sound.getStatusAsync();
    reloadStatus()
    console.log("Speed is " + status.rate);
    
  }

  async function skip(tracks){
    
    

    await sound.unloadAsync()

    console.log("old index is " + currentIndex)

    currentIndex = (currentIndex + tracks) % playlist.length;

    console.log("new index is " + currentIndex)

    loadSound(playlist[currentIndex].getSongSource(), true)

  }


  /*
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  */

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}></View>
      <View style={{ flex: 5, justifyContent: "center" }}>
        {/*<Image
          style={styles.imagePosition}
          source={require("../assets/images/hairGod.jpg")}
        ></Image>*/}
        <Text style={{ alignSelf: "center", justifyContent: "center" }}>
          
          {isLoaded ? "something loaded" : "nothing loaded"}
          {/* playlist[currentIndex].getSongName() */ }
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
          {/*<Slider value = {sliderValue} onValueChange = {(sliderValue) =>setSliderValue(sliderValue)} minimumValue={0} maximumValue={100} step = {1} thumbTintColor='#04A5BA' />*/}
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={{ flex: 0.5, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ paddingLeft: 20 }}>{isLoaded ? millisToTime(status.positionMillis) : "waiting to load"}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ paddingRight: 20 }}>{isLoaded ? millisToTime(status.durationMillis) : "waiting to load"}</Text>
        </View>
      </View>

      <View style={styles.iconView}>
        <TouchableOpacity  onPress = {() => skip(-1)}>
          <Ionicons size={windowWidth / 8} name='play-skip-back-outline'  />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => advance(-15)}>
          <Ionicons style={{transform: [{rotateY: '180deg'}]}} size={windowWidth / 8} name='refresh-outline'  />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => speedUp(-0.25)}>
          <Ionicons size={windowWidth / 8} name='play-back-outline' />
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => handlePress()}>
          <Ionicons size = {windowWidth / 7} name= "pause-circle-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => speedUp(0.25)}> 
          <Ionicons size={windowWidth / 8} name='play-forward-outline'  />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => advance(15)}>
          <Ionicons size={windowWidth / 8} name='refresh-outline'  />
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => skip(1)}>
          <Ionicons size={windowWidth / 8} name='play-skip-forward-outline'  />
        </TouchableOpacity>
      </View>

       <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ paddingLeft: 20 }}
            onPress={() => alert("hello")}
          >
            <Ionicons name='caret-up-circle-outline'  />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ paddingRight: 20 }}>
          {isLoaded ? status.rate : "1"}{"x"}
          </Text>
        </View>
      </View>
    </View> 
  );
}


const styles = StyleSheet.create({
  imagePosition: {
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

/*

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

import {PlaylistItem, playlist} from "./Songs";







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

  let index = 0;
  let maxIndex = 3;
  


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
    await sound.loadAsync(playlist[0].source);
    console.log("Audio loaded " + (index % 4));
    setPlaybackStatus(sound.getStatusAsync());
    
    
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
    console.log("next " + (index % 4));
    await sound.unloadAsync();
    
    index++;
    
    await sound.loadAsync(playlist[index%4].source);
    
    await sound.playAsync();
    setPlayPauseIcon('pause-circle-outline');
    setIsPlaying(true);
    
  }

  async function handleBack(){
    console.log("back" + (index % 4));
    await sound.unloadAsync();
    
    index--;

    await sound.loadAsync(playlist[index%4].source);

    setPlaybackStatus(sound.getStatusAsync());
    await sound.playAsync();
        setPlayPauseIcon('pause-circle-outline');
        setIsPlaying(true); 
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
          Audio Branch {sliderValue} {sound.positionMillis} 
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
          {/*<Slider value = {sliderValue} onValueChange = {(sliderValue) =>setSliderValue(sliderValue)} minimumValue={0} maximumValue={100} step = {1} thumbTintColor='#04A5BA' />}
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
        <TouchableOpacity onPress={() => handleBack()} >
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
*/