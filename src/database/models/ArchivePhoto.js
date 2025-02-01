function archivePhotoData(sequelize, DataTypes) {
    let archivePhotoTableName = "ArchivePhoto";

    let archivePhotoColumns = {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ArchiveName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };

    let archivePhotoConfig = {
        timestamps: false,
        tableName: "ArchivePhoto",
    };

    const ArchivePhoto = sequelize.define(
        archivePhotoTableName,
        archivePhotoColumns,
        archivePhotoConfig
    );

    ArchivePhoto.associate = function (models) {
        ArchivePhoto.belongsTo(models.Archive, {
            as: "Archive",
            foreignKey: "ArchiveName",
            targetKey: "Name",
        });
    };

    return ArchivePhoto;
}

module.exports = archivePhotoData;
