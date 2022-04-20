const userController = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.get("/", userController.gets);
router.post("/auth", userController.authUser);

// router.get("/:uid", userController.getUserSong);
// router.get("/:uid/password/:password", userController.authUser);

router.post("/addSong", userController.addSongPlayList);
router.post("/removeSong", userController.removeSongPlayList);
// router.post("/", bookController.create);
// router.put("/:bookId", bookController.update);
// router.delete("/:bookId", bookController.remove);

module.exports = router;