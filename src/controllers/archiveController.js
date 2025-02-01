require('dotenv').config();
const db = require('../database/models');

const getArchives = async (req, res) => {
  try {
    const archives = await db.Archive.findAll();
    res.json(archives);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obtaining Archives' });
  }
};

const getArchiveById = async (req, res) => {
  try {
    const archiveId = req.params.archiveId;

    const archive = await db.Archive.findByPk(archiveId);

    if (!archive) {
      return res.status(404).json({ error: 'Archive not found' });
    }

    res.json(archive);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createArchive = async (req, res) => {
  try {
    const { Name, Description } = req.body;

    // Verificar si ya existe un archivo con el mismo nombre
    const existingArchive = await db.Archive.findOne({ where: { Name } });
    if (existingArchive) {
      return res.status(400).json({ error: 'Archive with this name already exists' });
    }

    const newArchiveEntry = await db.Archive.create({
      Name,
      Description,
    });

    res.json({ message: "Archive created successfully", archive: newArchiveEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error creating the archive: ${error.message}` });
  }
};

module.exports = {
  getArchives,
  getArchiveById,
  createArchive,
};
