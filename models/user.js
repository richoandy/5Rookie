'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    position: DataTypes.STRING,
    medal: DataTypes.STRING,
    star: DataTypes.INTEGER,
    link_steam: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Hero, {
      through: models.HeroFavorite
    })
    User.hasMany(models.HeroFavorite)

    User.belongsToMany(models.Team, {
      through: models.UserTeam
    })
    User.hasMany(models.UserTeam)
  };

  User.getUserByPosition = function(position) {
    return User.findAll({
      where: {
        position: position
      }
    })
  }

  return User;
};
