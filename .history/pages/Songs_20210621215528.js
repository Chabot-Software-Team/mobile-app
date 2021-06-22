class PlaylistItem{
    constructor(name, songSource, imageSource, index) {
        this.name = name;
        this.songSource = songSource;
        this.imageSource = imageSource;
        this.index = index;
        
      }
    
    getSongSource(){
        return this.songSource;
    };

};

const playlist = [
    new PlaylistItem("song1", require("../assets/audio/song1.mp3"), require("../assets/images/trees.png"), 1),
    new PlaylistItem("song2", require("../assets/audio/song2.mp3"), require("../assets/images/trees.png"), 2),
    new PlaylistItem("song3", require("../assets/audio/song3.mp3"), require("../assets/images/trees.png"), 3),
    new PlaylistItem("song4", require("../assets/audio/song4.mp3"), require("../assets/images/trees.png"), 4),
];

export {PlaylistItem, playlist};
