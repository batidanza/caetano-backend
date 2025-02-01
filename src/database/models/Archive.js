function archiveData(sequelize, DataTypes) {
    let archiveTableName = "Archive";

    let archiveColumns = {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    };

    let archiveConfig = {
        timestamps: false,
        tableName: "Archive",
    };

    const Archive = sequelize.define(
        archiveTableName,
        archiveColumns,
        archiveConfig
    );

    Archive.associate = function (models) {
        Archive.hasMany(models.ArchivePhoto, {
            as: "ArchivePhotos",
            foreignKey: "ArchiveName",
            sourceKey: "Name",
        });
    };

    return Archive;
}

module.exports = archiveData;
