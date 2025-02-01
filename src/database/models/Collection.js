function collectionData(sequelize, DataTypes) {
    let collectionTableName = "Collection";
  
    let collectionColumns = {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
  
      Description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Image: {
        type: DataTypes.STRING, // Cambiar el tipo según tus necesidades
        allowNull: true,
      },
      
      Position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      }
    };
  
    let collectionConfig = {
      timestamps: false,
      tableName: "Collection",
    };
  
    const Collection = sequelize.define(
      collectionTableName,
      collectionColumns,
      collectionConfig
    );
  
    Collection.associate = function (models) {
      Collection.hasMany(models.Photo, {
        as: "Photos",
        foreignKey: "CollectionID",
      });
    };
  
    return Collection;
  }
  
  module.exports = collectionData;
  