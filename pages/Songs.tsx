import { AVPlaybackSource } from "expo-av/build/AV";

class PlaylistItem {
  name: string;
  songSource: AVPlaybackSource;
  imageSource: string;
  index: number;
  constructor(name: string, songSource: AVPlaybackSource, imageSource: string, index: number) {
    this.name = name;
    this.songSource = songSource;
    this.imageSource = imageSource;
    this.index = index;
  }

    // getSongName(){
    //     return this.name;
    // };

    // getImageSource(){
    //     return this.imageSource;
    // }

    // you don't need these, just access the variable somewhere like playlistitem.imageSource

};

const playlist = [
    new PlaylistItem("song1", require("../assets/audio/song1.mp3"), require("../assets/images/trees.png"), 0),
    new PlaylistItem("song2", require("../assets/audio/song2.mp3"), require("../assets/images/hairGod.jpg"), 1),
    new PlaylistItem("song3", require("../assets/audio/song3.mp3"), require("../assets/images/trees.png"), 2),
    new PlaylistItem("song4", require("../assets/audio/song4.mp3"), require("../assets/images/trees.png"), 3),
];

export { PlaylistItem, playlist };
