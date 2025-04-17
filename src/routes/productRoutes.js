// productRoutes.js
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const productController = require("../controllers/productController");

cloudinary.config({
  cloud_name: "dud8xde2j",
  api_key: "746121923319648",
  api_secret: "VIq0sIuB1Ewk8AxN9c-29Dc4TbQ",
});

const imageCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Products",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif", "JPG"],
  },
});

const imageCloudinaryUpload = multer({ storage: imageCloudinaryStorage });

router.get("/products", productController.getProducts);

router.get("/product_detail/:id", productController.getProductById);

router.get("/search", productController.searchProducts);

router.post("/payment", productController.payment)


router.get("/byCategory/:category_id", productController.getProductsByCategory);

router.post(
  "/create_product",
  imageCloudinaryUpload.array("image"),
  productController.createProduct
);

module.exports = router;
