'use strict';
module.exports = (sequelize, DataTypes) => {
  var HeroFavorite = sequelize.define('HeroFavorite', {
    UserId: DataTypes.INTEGER,
    HeroId: DataTypes.INTEGER
  }, {});
  HeroFavorite.associate = function(models) {
    // associations can be defined here
    HeroFavorite.belongsTo(models.User)
    HeroFavorite.belongsTo(models.Hero)
  };
  return HeroFavorite;
};
