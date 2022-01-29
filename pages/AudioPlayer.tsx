/*

This page needs serious work, but is not a priority as we currently have no audio tour!

*/

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { Audio, AVPlaybackStatus } from "expo-av";

import { Ionicons } from "@expo/vector-icons";

import { PlaylistItem, playlist } from "./Songs";

import { Slider } from "react-native-elements";
import { AVPlaybackSource } from "expo-av/build/AV";

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
  const [sound, setSound] = useState<Audio.Sound>(null); //holds the sound object
  const [isPlaying, setIsPlaying] = useState(false); //allows the handlePress function to know whether to play or pause
  const [status, setStatus] = useState<AVPlaybackStatus>(null); //holds the playback status of the sound object
  const [isLoaded, setIsLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  function millisToTime(millis: number) {
    //Takes a value of time in milliseconds and converts it into a minutes seconds string like 3:43
    let seconds: number | string = Math.floor(millis / 1000); // <- You use it as both a number and a string so you do a pipe for what's called a Union Type, saying "this can be a number OR a string": https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if (seconds == 0) {
      seconds = "00";
    } else if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  const handlePress = () => {
    if (sound == null) {
      loadSound(playlist[currentIndex].songSource);
      handlePress();
    } else {
      if (isPlaying) {
        pauseSound();
      } else {
        playSound();
      }
    }
  };

  async function loadSound(source: AVPlaybackSource, playOnLoad?: boolean) {
    // <- theres a question mark here because on line 66 you didn't give it, so you need to mark that it's "optional" with a ? which says "this can sometimes be null and that's ok" if you want to sometimes not give it
    console.log("loadSound called");

    const playbackObject = new Audio.Sound();

    await playbackObject.loadAsync(source, { shouldPlay: playOnLoad });

    console.log("Sound source loaded " + source);

    playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdateFunc);

    await setSound(playbackObject);

    /*allows the playback status to be accessed using the status hook outside 
    the scopt of this funciton*/
    let AVPlaybackStatus = await sound.getStatusAsync();
  }

  const onPlaybackStatusUpdateFunc = (playbackStatus: AVPlaybackStatus) => {
    /* onPlaybackStatusUpdateFunc calls any time the playback status updates, 
  or periodically based on the progressUpdateIntervalMillis property
  */
    // hey aidan, typescript caught this, you need to make sure isLoaded is true to access
    // attributes of playbackStatus like positionMillis etc, because if isLoaded if false, they won't exist on the object and the app will crash in runtime
    // How did I know? Hover over AVPlaybackStatus above on line 95:
    // (alias) type AVPlaybackStatus = {
    //     isLoaded: false;
    //     androidImplementation?: string;
    //     error?: string;
    // } | {
    //     isLoaded: true;
    //     androidImplementation?: string;
    //     uri: string;
    //     progressUpdateIntervalMillis: number;
    //     durationMillis?: number;
    //     positionMillis: number;
    //     playableDurationMillis?: number;
    //     seekMillisToleranceBefore?: number;
    //     ... 9 more ...;
    //     didJustFinish: boolean;
    // }
    // see how more attributes exist when isLoaded is true?
    if (playbackStatus.isLoaded) {
      setStatus(playbackStatus);
      setIsLoaded(true);
      console.log("Playback status updated");
      setSliderValue(playbackStatus.positionMillis);
      if (playbackStatus.didJustFinish == true) {
        skip(1);
      }
    }
  };

  useEffect(() => {
    loadSound(playlist[currentIndex].songSource, false);
  }, []);

  useEffect(() => {
    console.log("currentIndex is now " + currentIndex);
  }, [currentIndex]);

  const reloadStatus = async () => {
    let AVPlaybackStatus = await sound.getStatusAsync();
    //console.log(AVPlaybackStatus)
    setStatus(AVPlaybackStatus);
  };

  async function playSound() {
    console.log("playSound Called");
    await sound.playAsync();
    //setIsPlaying("Sound playing " + true);  <- TS infered that setIsplaying is a boolean because you did useState(false), so setting it as a string here might be a problem.
    // did you mean
    setIsPlaying(true);

    if (status.isLoaded) console.log(status.isPlaying); // yep TS said you need to check isLoaded or you wont be able to know if it's playing
    reloadStatus();
    // setIsPlaying(true)
    // console.log(sound.isPlaying);
  }

  async function pauseSound() {
    console.log("pauseSound Called");
    await sound.pauseAsync();
    setIsPlaying(false);
    if (status.isLoaded) console.log("Sound playing " + status.isPlaying); // yep TS said you need to check isLoaded or you wont be able to know if it's playing
    reloadStatus();
    // setIsPlaying(false)
  }

  async function advance(seconds: number) {
    if (status.isLoaded) {
      let currentPosition = status.positionMillis;
      await sound.setPositionAsync(currentPosition + seconds * 1000);
      reloadStatus();
      console.log("Position is " + status.positionMillis);
    }
  }

  async function goToPosition(milliseconds: number) {
    if (status.isLoaded) {
      if (milliseconds < status.durationMillis) {
        await sound.setPositionAsync(milliseconds);
        reloadStatus();
      }
    }
  }

  async function speedUp(increment: number) {
    if (status.isLoaded) {
      let currentRate = status.rate;
      await sound.setRateAsync(currentRate + increment, true);
      //let AVPlaybackStatus = await sound.getStatusAsync();
      reloadStatus();
      console.log("Speed is " + status.rate);
    }
  }

  async function skip(tracks: number) {
    await sound.unloadAsync();

    console.log("old index is " + currentIndex);

    currentIndex = (currentIndex + tracks) % playlist.length;

    console.log("new index is " + currentIndex);

    loadSound(playlist[currentIndex].songSource, true);
    setIsPlaying(true);
  }

  function onSliderUpdate() {}

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}></View>
      <View style={{ flex: 5, justifyContent: "center" }}>
        <Image
          style={styles.imagePosition}
          source={
            status.isLoaded //   see line 244
              ? playlist[currentIndex].imageSource
              : require("../assets/images/hairGod.jpg")
          }
        ></Image>
      </View>
      <View style={{ flex: 1, alignSelf: "center" }}>
        <Text>
          {status.isLoaded ? playlist[currentIndex].name : "nothing loaded"}{" "}
          {/* see line 244 */}
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
          <Slider
            step={1000}
            value={sliderValue}
            onValueChange={(sliderValue) => setSliderValue(sliderValue)}
            minimumValue={0}
            // maximumValue={isLoaded ? status.durationMillis : 1000}   <- lol this one's more complicated, TS is not smart enough to know that isLoaded is at all connected to status.isLoaded,
            // and will complain that .durationMillis will not exist (even though you are making sure it will) anywaaay just change it to this:
            maximumValue={status.isLoaded ? status.durationMillis : 1000}
            thumbTintColor="#04A5BA"
          />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={{ flex: 0.5, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ paddingLeft: 20 }}>
            {status.isLoaded ? millisToTime(status.positionMillis) : ""}{" "}
            {/* see line 244 */}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ paddingRight: 20 }}>
            {status.isLoaded ? millisToTime(status.durationMillis) : ""}{" "}
            {/* see line 244 */}
          </Text>
        </View>
      </View>

      <View style={styles.iconView}>
        <TouchableOpacity onPress={() => skip(-1)}>
          <Ionicons size={windowWidth / 8} name="play-skip-back-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => advance(-15)}>
          <Ionicons
            style={{ transform: [{ rotateY: "180deg" }] }}
            size={windowWidth / 8}
            name="refresh-outline"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => speedUp(-0.25)}>
          <Ionicons size={windowWidth / 8} name="play-back-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress()}>
          <Ionicons
            size={windowWidth / 7}
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => speedUp(0.25)}>
          <Ionicons size={windowWidth / 8} name="play-forward-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => advance(15)}>
          <Ionicons size={windowWidth / 8} name="refresh-outline" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => skip(1)}>
          <Ionicons size={windowWidth / 8} name="play-skip-forward-outline" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ paddingLeft: 20 }}
            onPress={() => Alert.alert("hello")}
          >
            <Ionicons size={windowWidth / 8} name="caret-up-circle-outline" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ paddingRight: 20 }}>
            {status.isLoaded ? status.rate : "1"} {/* see line 244 */}
            {"x"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePosition: {
    alignSelf: "center",
    width: Dimensions.get("window").width / 1.25,
    height: Dimensions.get("window").width / 1.25,
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
