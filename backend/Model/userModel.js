// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database'); // MySQL connection file

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false // equivalent to `required: true`
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: null // equivalent to `default: null`
  },
  email: {
    type: DataTypes.STRING,
    unique: true // equivalent to `unique: true`
    // No need for a custom error message like in Mongoose
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // equivalent to `required: true`
    validate: {
      len: [8] // equivalent to `minLength: [8]`
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true // Optional field, so allowNull is set to true
  }
}, {
  tableName: 'users' // Equivalent to `mongoose.model('users', userSchema)`
});

module.exports = User;
