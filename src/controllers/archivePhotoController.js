const db = require('../database/models');

const getArchivePhotos = async (req, res) => {
  try {
    const archivePhotos = await db.ArchivePhoto.findAll();
    res.json(archivePhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obtaining Archive Photos' });
  }
};

const getPhotoByArchive = async (req, res) => {
  try {
    const archiveName = req.params.archiveName;  // Cambia el nombre del parámetro a archiveName
    const photos = await db.ArchivePhoto.findAll({
      where: { ArchiveName: archiveName },  // Cambia ArchiveID a ArchiveName
    });
    res.json(photos);
  } catch (error) {
    console.error(
      `Error obtaining photos for archive with name ${req.params.archiveName}:`,
      error
    );
    res.status(500).json({ error: "Error obtaining photos for archive" });
  }
};


const getArchivePhotoById = async (req, res) => {
  try {
    const photoId = req.params.photoId;

    const archivePhoto = await db.ArchivePhoto.findByPk(photoId);

    if (!archivePhoto) {
      return res.status(404).json({ error: 'Archive Photo not found' });
    }

    res.json(archivePhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createArchivePhoto = async (req, res) => {
  try {
    const archiveName = req.body.ArchiveName;
    const imageUrl = req.files[0].path;

    const newArchivePhotoEntry = await db.ArchivePhoto.create({
      Image: imageUrl,
      ArchiveName: archiveName,
    });

    res.json({ message: "Archive Photo created successfully", archivePhoto: newArchivePhotoEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error creating the archive photo: ${error.message}` });
  }
};

module.exports = {
  getArchivePhotos,
  getArchivePhotoById,
  createArchivePhoto,
  getPhotoByArchive
};
