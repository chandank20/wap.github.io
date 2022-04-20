const express = require("express");
const Song = require("../models/song");
const User = require("../models/user");

const gets = (req, res, next) => {
    return res.status(200).json(Song.gets());
};

const search = (req, res, next) => {
    return res.status(200).json(Song.getSongByTitle(req.query.title));
};

const getUserSong = (req, res, next) => {
    return res.status(200).json(User.getSongsByUser(req.params.sessionId));
};


module.exports = { gets,search, getUserSong };