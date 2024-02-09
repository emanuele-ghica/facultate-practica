const { DataTypes } = require('sequelize');
const sequelize = require('../pool');
const User = require("./user");

const Exam = sequelize.define('Exam', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    professor_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    professor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    subject: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    curriculum: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    student_year: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['REVIEW', 'ACCEPTED', 'PROPOSED']]
        }
    },
    proposed_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    room: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    edited_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'exams',
    timestamps: false
});

module.exports = Exam;
