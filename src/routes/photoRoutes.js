const express = require("express");
const router = express.Router();
const photoController = require("../controllers/collectionPhotoController");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dysrhzwfg",
  api_key: "126363211343947",
  api_secret: "TFJ0KbahM9HgzG5SHK9bnRNnr3A",
});

// Configurar almacenamiento de Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Media",
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage });

router.get("/photos", photoController.getAllPhoto);

router.get("/byCollection/:collectionId", photoController.getPhotoByCollection);

router.post("/upload", upload.array("Image"), photoController.uploadPhoto);

router.put("/photos/swap", photoController.swapPhotoIds);

module.exports = router;
