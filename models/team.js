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

  // Team.searchBy = function(search) {
  //   return Team.findAll({
  //     where: {
  //       nama: {
  //         $iLike: `%${search}%`
  //       }
  //     }
  //   })
  // }

  // Team.searchBy = function(search) {
  //   return new Promise(function(resolve, reject) {
  //     Team.findAll({
  //       where: {
  //         nama: {
  //           $iLike: `%${search}%`
  //         }
  //       }
  //     })
  //     .then(teams => {
  //       var promises = teams.map((team) => {
  //         console.log("ini team---", team.id_ketua);
  //         models.User.findById(6)
  //         .then((user) => {
  //           team.nama_ketua = user.nickname;
  //         })
  //       })
  //       Promise.all(promises).then(() => {
  //         resolve(teams);
  //       })
  //     })
  //   })
  // }

  return Team;
};
