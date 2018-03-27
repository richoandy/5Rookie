'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserTeam = sequelize.define('UserTeam', {
    TeamId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  UserTeam.associate = function(models) {
    // associations can be defined here
  };
  return UserTeam;
};