'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate({ Course }) {
    //   User.hasMany(Course, { 
    //     foreignKey: 'userId',
    //     as: "author"
    //   })
    // }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function(models) {
    User.hasMany(models.Course, {
      foreignKey: 'userId',
      as: 'user'
    })
  };
  return User;
};