// models/User.js
function userData(sequelize, DataTypes) {
    let userTableName = 'User';

    let userColumns = {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false
        }
    };

    let userConfig = {
        timestamps: false,
        tableName: 'User',
    };

    const User = sequelize.define(
        userTableName,
        userColumns,
        userConfig
    );

    return User;
}

module.exports = userData;
