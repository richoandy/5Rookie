'use strict';

const models = ('./models')

module.exports = (sequelize, DataTypes) => {
  var Team = sequelize.define('Team', {
    nama: DataTypes.STRING,
    id_ketua: DataTypes.INTEGER
  }, { });
  Team.associate = function(models) {
    // associations can be defined here
    Team.belongsToMany(models.User, {
      through: models.UserTeam
    })

    Team.hasMany(models.UserTeam)

    Team.hasMany(models.Invitation)

    Team.belongsTo(models.User, {
      foreignKey: "id_ketua",
      as: 'ketua'
    })
  };

  // Team.avaliableTeam = function() {
  //   return Team.findAll({
  //     include: [
  //       {
  //         model: models.UserTeam
  //       }
  //     ]
  //   })
  // }

  Team.searchBy = function(search) {
    return Team.findAll({
      where: {
        nama: {
          $iLike: `%${search}%`
        }
      }
    })
  }

  return Team;
};
