function mercadolibreData(sequelize, DataTypes) {
    let mercadolibreTableName = "MercadoLibre";
  
    let mercadolibreColumns = {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      Description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      Image: {
        type: DataTypes.STRING, 
        allowNull: true,
      },

    };
  
    let mercadolibreConfig = {
      timestamps: false,
      tableName: "MercadoLibre",
    };
  
    const MercadoLibre = sequelize.define(
      mercadolibreTableName,
      mercadolibreColumns,
      mercadolibreConfig
    );
  
    return MercadoLibre;
  }
  
  module.exports = mercadolibreData;
  