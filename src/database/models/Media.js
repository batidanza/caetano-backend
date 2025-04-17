module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'product',  // Asegúrate de que el modelo 'Product' esté bien definido
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      timestamps: false,  // Activa 'createdAt' y 'updatedAt'
      tableName: 'media',
    }
  );

  Media.associate = function (models) {
    Media.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });
  };

  return Media;
};
