'use strict';
module.exports = (sequelize, DataTypes) => {
  var Team = sequelize.define('Team', {
    nama: DataTypes.STRING,
    id_ketua: DataTypes.INTEGER
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};