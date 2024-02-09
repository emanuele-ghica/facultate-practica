const {DataTypes} = require('sequelize');
const sequelize = require('../pool');
const Subject = require('./subjects')
const Exam = require('./exam')


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['student', 'professor', 'coordinator', 'secretary']]
        }
    },
    curriculum: {
        type: DataTypes.STRING,
        allowNull: true
    },
    student_year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    coordinating: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'users',
    timestamps: false,
});

User.hasMany(Subject, { foreignKey: 'user_id', as: 'subjects' });
User.hasMany(Exam, { foreignKey: 'created_by', as: 'created_by'});
User.hasMany(Exam, { foreignKey: 'professor_id', as: 'professor_id'});
module.exports = User;