let songs = [
    { songId: 1, title: "Hero", reliseDate: '2018-01-04', url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",},
    { songId: 2, title: "Hall of the Frame", reliseDate:'2022-01-07', url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", },
    { songId: 3, title: "Sonali alo", reliseDate: '2011-12-01', url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/big%20ben.mp3", },
    { songId: 4, title: "Good day will come", reliseDate: '2014-01-01', url: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/background%20image.mp3" },
    { songId: 5, title: "I me aur main", reliseDate: '2017-11-19', url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
    { songId: 6, title: "Sajena", reliseDate:'2011-01-01', url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
    { songId: 7, title: "Unstopable", reliseDate: '2012-09-11', url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
    { songId: 8, title: "Into your arms", reliseDate: '2012-04-08', url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { songId: 9, title: "Pasoori", reliseDate: '2018-02-14', url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", },
    { songId: 10, title: "Meagla achash", reliseDate: '2021-04-21', url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

class Song {
    constructor(songId, title, reliseDate) {
        this.songId = songId;
        this.title = title;
        this.reliseDate = reliseDate;
    }

    static gets() {
        return songs;
    }

    static getSongByTitle(title) {
          return songs.filter((x) =>x.title.toUpperCase().includes(title.toUpperCase()));
    }
}

module.exports = Song;