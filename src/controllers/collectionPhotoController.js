const db = require('../database/models');

const getAllPhoto = async (req, res) => {
    try {

      const allPhoto = await db.Photo.findAll();
  
      res.json(allPhoto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los medios" });
    }
  };

  const getPhotoByCollection = async (req, res) => {
    try {
      const collectionId = req.params.collectionId;
      const photo = await db.Photo.findAll({
        where: { CollectionID: collectionId },
      });
      res.json(photo);
    } catch (error) {
      console.error(
        `Error obtaining photo photos for collection with ID ${req.params.photoId}:`,
        error
      );
      res.status(500).json({ error: "Error obtaining photo for collection" });
    }
  };

  const uploadPhoto = async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No se ha proporcionado ninguna imagen" });
      }
  
      const { CollectionID, Name } = req.body;
      const uploadedFiles = req.files;
  
      // Obtener el último valor de Position en la colección actual
      const lastPhoto = await db.Photo.findOne({
        where: { CollectionID },
        order: [['Position', 'DESC']],
      });
  
      let nextPosition = 1; // Valor predeterminado si no hay fotos aún
  
      if (lastPhoto) {
        nextPosition = lastPhoto.Position + 1;
      }
  
      // Mapear los archivos subidos con los datos necesarios
      const uploadedPhoto = uploadedFiles.map((file) => ({
        Image: file.path,
        CollectionID,
        Name,
        Position: nextPosition,
      }));
  
      // Crear las fotos en la base de datos
      const createdPhoto = await db.Photo.bulkCreate(uploadedPhoto);
  
      res.json({ message: "Medios creados exitosamente", photo: createdPhoto });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al cargar los medios" });
    }
  };
  
  
  const swapPhotoIds = async (req, res) => {
    const { firstPhotoId, secondPhotoId } = req.body;
  
    const transaction = await db.sequelize.transaction();
  
    try {
      // Encuentra ambas fotos dentro de la transacción y bloquea las filas para actualizarlas
      const firstPhoto = await db.Photo.findByPk(firstPhotoId, { lock: transaction.LOCK.UPDATE, transaction });
      const secondPhoto = await db.Photo.findByPk(secondPhotoId, { lock: transaction.LOCK.UPDATE, transaction });
  
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
  getAllPhoto,
  getPhotoByCollection,
  uploadPhoto,
  swapPhotoIds
};
