// mainRoutes.js
const express = require("express");
const router = express.Router();
const collectionRoutes = require("./collectionRoutes");
const photoRoutes = require("./photoRoutes")
const archiveRoutes = require("./achiveRoutes")
const archivePhotoRoutes = require("./archivePhotoRoutes")
const userRoutes = require("./userRoutes");

router.get("/", (req, res) => {
    res.send("Welcome to the root URL");
  });

router.use("/collection", collectionRoutes);
router.use("/archive", archiveRoutes);
router.use("/archive-photo", archivePhotoRoutes);
router.use("/photo", photoRoutes);
router.use("/user", userRoutes);

module.exports = router;
