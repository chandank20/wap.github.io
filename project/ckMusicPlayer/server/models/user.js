const Song = require('./song');

let users = [
    { userId: 1, username: "Miltan", password: "123", sessionId: "1234", userSongList: [{ songId: 1 }, { songId: 2 }, { songId: 4 }] },
    { userId: 2, username: "krishan", password: "123", sessionId: "22", userSongList: [{ songId: 1 }, { songId: 2 }, { songId: 5 }] },
    { userId: 3, username: "chandan", password: "123", sessionId: "33", userSongList: [{ songId: 2 }, { songId: 3 }] },
];

class User {
    constructor(userId, username, password) {
        this.userId = userId;
        this.username = username;
        this.password = password;
    }

    static gets() {
        return users;
    }

    static getsBySessionId(sessionId) {
        const user = users.find(x => x.userId == sessionId);
        return user.userSongList.map(x => x.songId);
    }

    static authUser(username, password) {
        let user = users.find((x) => x.username == username && x.password == password);
        if (user == null || user == undefined) {
            return {sessionId: "Invalid"};
        } else {
            user.sessionId = Math.ceil(Date.now() * Math.random());
            const index = users.findIndex((x) => x.username == username && x.password == password);
            users.splice(index, 1, user);
            return {sessionId: user.sessionId};
        }
    }

    static addSongToPlayList(sessionId, songId) {
        const user = users.find((x) => x.sessionId == sessionId);        
        if (user != null && user != undefined) {
            const index = user.userSongList.findIndex(x => x.songId == songId);
            if (index < 0) {
                user.userSongList.push({ songId: songId });
                let songList = user.userSongList.map(x => x.songId);
                return Song.gets().filter(x => songList.includes(x.songId));
            }
        } else {
            throw new Error('Song Not Found!');
        }
    }

    static removeSongFromPlayList(sessionId, songId) {
        const user = users.find((x) => x.sessionId == sessionId);
        if (user != null && user != undefined) {
            user.userSongList = user.userSongList.filter(x => x.songId != songId);
            let songList = user.userSongList.map(x => x.songId);
            return Song.gets().filter(x => songList.includes(x.songId));
        } else {
            throw new Error('Song Not Found!');
        }
    }

    static getSongsByUser(sessionId) {
        const user = users.find((x) => x.sessionId == sessionId);
        let songList = user.userSongList.map(x => x.songId);
        return Song.gets().filter(x => songList.includes(x.songId));
    }

}

module.exports = User;