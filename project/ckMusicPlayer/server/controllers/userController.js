const express = require("express");
const User = require("../models/user");
const Song = require("../models/song");

const gets = (req, res, next) => {
    return res.status(200).json(User.gets());
};

const authUser = (req, res, next) => {    
    return res.status(201).json(User.authUser(req.body.username, req.body.password));
};

// const getUserSong = (req, res, next)=> {
//     return res.status(300).json(Song.getUserSong(req.params.uid));
// };

// const getAllSongs = (req, res, next) => {    
//     return res.status(301).json(Song.gets());
// };

const addSongPlayList = (req, res, next) => {
    return res.status(202).json(User.addSongToPlayList(req.body.sessionId, parseInt(req.body.songId)));
};

const removeSongPlayList = (req, res, next) => {
    return res.status(203).json(User.removeSongFromPlayList(req.body.sessionId, parseInt(req.body.songId)));
};

module.exports = { gets, authUser, addSongPlayList, removeSongPlayList };