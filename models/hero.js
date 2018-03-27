'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hero = sequelize.define('Hero', {
    nama: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Hero.associate = function(models) {
    // associations can be defined here
  };
  return Hero;
};