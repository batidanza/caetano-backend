const db = require("../database/models");
const { Op } = require('sequelize');
const { MercadoPagoConfig, Preference } = require('mercadopago')

require("dotenv").config();

const client = new MercadoPagoConfig({ accessToken: "APP_USR-4600131737237915-052723-b9dae626ed974b3df8ce092758b9b23d-1833251738" });

const payment = async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.name,  // Cambiado a snake_case
          quantity: Number(req.body.quantity),  // Cambiado a snake_case
          unit_price: Number(req.body.price),  // Cambiado a snake_case
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=1s",
        failure: "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=1s",
        pending: "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=1s",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client)
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      error: "error al crear payment"
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: [
        { model: db.Category, as: "category" },
      ],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obtaining products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDetails = await db.product.findByPk(productId, {
      include: [
        { model: db.category, as: "category" },
      ],
    });

    if (!productDetails) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(productDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error obtaining product details: ${error.message}` });
  }
};


const cloudinary = require('cloudinary').v2;

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const productImages = req.files;

    const uploadedImagesUrls = [];

    for (let i = 0; i < productImages.length; i++) {
      const image = productImages[i];
      const cloudinaryResponse = await cloudinary.uploader.upload(image.path);
      const imageUrl = cloudinaryResponse.secure_url; 
      uploadedImagesUrls.push(imageUrl);
    }

    const newProductEntry = await db.Product.create({
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      care: newProduct.care,
      image: uploadedImagesUrls, 
      category_id: newProduct.category_id,
      palette: newProduct.palette,
      size: newProduct.size
    });

    res.json({ message: "Product created successfully", product: newProductEntry });
  } catch (error) {
    console.error("Error en la creación del producto:", error);
    res.status(500).json({ error: `Error publishing the product: ${error.message}` });
  }
};


const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.category_id;  
    const products = await db.product.findAll({
      where: { category_id: categoryId }, 
    });
    res.json(products);
  } catch (error) {
    console.error(`Error obtaining products for category with ID ${req.params.category_id}:`, error);  
    res.status(500).json({ error: "Error obtaining products for category" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.term;

    const products = await db.product.findAll({
      where: { name: { [Op.like]: `%${searchTerm}%` } },  
      include: [
        { model: db.category, as: "category" }, 
      ],
    });

    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Error searching products" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  getProductsByCategory,
  searchProducts,
  payment
};
