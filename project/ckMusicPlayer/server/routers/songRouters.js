const songController = require("../controllers/songController");
const userController = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.get("/", songController.gets);
router.get("/search", songController.search);
router.get("/userSong/:sessionId", songController.getUserSong);

module.exports = router;