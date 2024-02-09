const { DataTypes } = require('sequelize');
const sequelize = require('../pool');
const User = require('./user');

const Subject = sequelize.define('Subject', {
    subject_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'subjects',
    timestamps: false
});

module.exports = Subject;