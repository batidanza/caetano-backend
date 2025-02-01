
require('dotenv').config();
const db = require('../database/models');


const getCollection= async (req, res) => {
  try {
    const registeredCollection = await db.Collection.findAll();
    res.json(registeredCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obtaining Users' });
  }
};


const getCollectionById = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;

    const collection = await db.Collection.findByPk(collectionId);

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    res.json(collection); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
  

const createCollection = async (req, res) => {
  try {
    const newCollection = req.body;
    const collectionImageUpload = req.files;
    const firstImage = collectionImageUpload[0].filename;
    const cloudinaryImageUrl = `https://res.cloudinary.com/dlmwxlrn8/image/upload/${firstImage}`;


    const newCollectionEntry = await db.Collection.create({
      Name: newCollection.Name,
      Description: newCollection.Description,
      Date: newCollection.Date,
      Image: cloudinaryImageUrl,
    });

    res.json({ message: "Collection created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error publishing the collection: ${error.message}` });
  }
};

const createMl = async (req, res) => {
  try {
    const newCollection = req.body;
    const collectionImageUpload = req.files;
    const firstImage = collectionImageUpload[0].filename;
    const cloudinaryImageUrl = `https://res.cloudinary.com/dlmwxlrn8/image/upload/${firstImage}`;


    const newCollectionEntry = await db.MercadoLibre.create({
      Description: newCollection.Description,
      Image: cloudinaryImageUrl,
    });

    res.json({ message: "Collection created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error publishing the collection: ${error.message}` });
  }
};

const getMl= async (req, res) => {
  try {
    const registeredCollection = await db.MercadoLibre.findAll();
    res.json(registeredCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obtaining Users' });
  }
};

const swapCollectionIds = async (req, res) => {
  const { firstPhotoId, secondPhotoId } = req.body;

  const transaction = await db.sequelize.transaction();

  try {
    // Encuentra ambas fotos dentro de la transacción y bloquea las filas para actualizarlas
    const firstPhoto = await db.Collection.findByPk(firstPhotoId, { lock: transaction.LOCK.UPDATE, transaction });
    const secondPhoto = await db.Collection.findByPk(secondPhotoId, { lock: transaction.LOCK.UPDATE, transaction });

    if (!firstPhoto || !secondPhoto) {
      await transaction.rollback();
      return res.status(404).json({ success: false, error: "Una o ambas fotos no fueron encontradas" });
    }

    // Intercambia las posiciones dentro de la transacción
    const tempPosition = firstPhoto.Position;
    await firstPhoto.update({ Position: secondPhoto.Position }, { transaction });
    await secondPhoto.update({ Position: tempPosition }, { transaction });

    // Si todo va bien, confirma la transacción
    await transaction.commit();

    res.json({ success: true, message: "Posiciones de las fotos intercambiadas exitosamente" });
  } catch (error) {
    // Si hay un error, revierte la transacción solo si aún no se ha terminado
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error(error);
    res.status(500).json({ success: false, error: "Error al intercambiar las posiciones de las fotos" });
  }
};



module.exports = {
  getCollection,
  getCollectionById ,
  createCollection,
  createMl,
  getMl,
  swapCollectionIds
};

