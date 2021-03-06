/*
Todo:
0. Slider
1. skip track
2. playback speed

*/

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

const [isPlaying, setIsPlaying] = useState(false);
const [playbackStatus, setPlaybackStatus] = useState();
async function loadAudio() {
  await sound.loadAsync(require("../assets/audio/Roar.mp3"));
  setPlaybackStatus(sound.getStatusAsync());
  setInterval(() => {
    setPlaybackStatus(sound.getStatusAsync());
  }, 1000);
}
loadAudio();

const handlePausePress = async () => {
  try {
    if (isPlaying == true) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else if (isPlaying == false) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  } catch (e) {
    console.log(e);
  }
};

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

export default function AudioPlayer() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}></View>
      <View style={{ flex: 5, justifyContent: "center" }}>
        <Image
          style={styles.imagePosition}
          source={require("../assets/images/hairGod.jpg")}
        ></Image>
        <Text style={{ alignSelf: "center", justifyContent: "center" }}>
          Description
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
          <Slider minimumValue={0} maximumValue={1} thumbTintColor='#04A5BA' />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={{ flex: 0.5, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ paddingLeft: 20 }}>{renderDuration()}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ paddingRight: 20 }}>{renderPosition()}</Text>
        </View>
      </View>

      <View style={styles.iconView}>
        <TouchableOpacity
          onPress={() => {
            alert("hello");
          }}
        >
          <Ionicons name='play-skip-back-outline' size={windowWidth / 6} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePausePress()}>
          <Ionicons name='play-back-outline' size={windowWidth / 6} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePausePress()}>
          <Ionicons name='pause-circle-outline' size={windowWidth / 6} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePausePress()}>
          <Ionicons name='play-forward-outline' size={windowWidth / 6} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("hello")}>
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
