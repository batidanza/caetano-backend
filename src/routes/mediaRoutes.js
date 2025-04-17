const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const mediaController = require("../controllers/mediaController");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: "dud8xde2j",
  api_key: "746121923319648",
  api_secret: "VIq0sIuB1Ewk8AxN9c-29Dc4TbQ",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Media",
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage });

router.get("/media", mediaController.getAllMedia);

router.post("/upload", upload.array("Image"), mediaController.uploadMedia);

router.get("/byProduct/:productId", mediaController.getMediaByProduct);

module.exports = router;
