function categoryData(sequelize, DataTypes) {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "category",
    }
  );

  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      as: "products",
      foreignKey: "category_id",
      onDelete: "CASCADE", 
    });
  };

  return Category;
}

module.exports = categoryData;
