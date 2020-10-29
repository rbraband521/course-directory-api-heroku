'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {};
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.User,
        key: "id",
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  Course.associate = function(models) {
    Course.belongsTo(models.User, { 
      foreignKey: 'userId',
      as: 'user'
    })
  }
  return Course;
};