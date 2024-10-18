// studentModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const User = require('./userModel'); // Import the related User model

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // References the User model
      key: 'id',   // User model's primary key
    },
    allowNull: false
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'students',  // Optional: Define the table name explicitly
  timestamps: true        // Optional: Sequelize will automatically manage createdAt and updatedAt
});

// Define the association between Student and User
Student.belongsTo(User, { foreignKey: 'userId' });

module.exports = Student;
