'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    posisi: DataTypes.STRING,
    medal: DataTypes.STRING,
    star: DataTypes.INTEGER,
    link_steam: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};