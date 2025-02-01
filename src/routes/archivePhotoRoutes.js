const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const archivePhotoController = require("../controllers/archivePhotoController");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: "dysrhzwfg",
  api_key: "126363211343947",
  api_secret: "TFJ0KbahM9HgzG5SHK9bnRNnr3A",
});

// Configurar almacenamiento de Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ArchivePhotos",
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage });

router.get("/archive-photos", archivePhotoController.getArchivePhotos);

router.get(
  "/archive-photos/:photoId",
  archivePhotoController.getArchivePhotoById
);

router.get("/byArchive/:archiveName", archivePhotoController.getPhotoByArchive);

router.post(
  "/create-archive-photo",
  upload.array("Image"),
  archivePhotoController.createArchivePhoto
);

module.exports = router;
