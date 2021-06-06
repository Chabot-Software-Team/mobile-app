class PlaylistItem{
    constructor(name, source, index) {
        this.name = name;
        this.source = source;
        this.index = index;
      }
    
    getSource(){
        return this.source;
    };

};

const playlist = [
    new PlaylistItem("song1", require("../assets/audio/song1.mp3"), 1),
    new PlaylistItem("song2", "../assets/audio/song2.mp3", 2),
    new PlaylistItem("song3", "../assets/audio/song3.mp3", 3),
    new PlaylistItem("song3", "../assets/audio/song4.mp3", 4),
];

export {PlaylistItem, playlist};
