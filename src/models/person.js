'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cnp: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    }
  });

  return Person;
};