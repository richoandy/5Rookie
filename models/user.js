'use strict';

const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const bcrypt = require('bcrypt');
  var User = sequelize.define('User', {
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    position: DataTypes.STRING,
    medal: DataTypes.STRING,
    star: DataTypes.INTEGER,
    link_steam: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        let password = user.password;
        let hash = bcrypt.hashSync(password, 10);
        console.log("hash--------", hash);
        user.password = hash;
      }
    }
  });
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

    User.hasMany(models.Team, {
      foreignKey: "id_ketua"
    })
  };

  User.getUserByPosition = function(position) {
    return User.findAll({
      where: {
        position: position
      }
    })
  }

  User.searchBy = function(search) {
    return User.findAll({
      where: {
        [Op.or]: {
          nickname: {
            $iLike: `%${search}%`
          },
          position: {
            $iLike: `%${search}%`
          },
          medal: {
            $iLike: `%${search}%`
          },
          email: {
            $iLike: `%${search}%`
          }
        }
      }
    })
  }

  User.prototype.loginCheck = function (password){
    if(bcrypt.compareSync(password, this.password)) {
     // Passwords match
     return true;
    } else {
     return false;
    }
  }

  return User;
};
