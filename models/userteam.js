'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserTeam = sequelize.define('UserTeam', {
    TeamId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    position: {
      type : DataTypes.STRING,
      validate: {
        isAvailable: function(value, next){
          UserTeam.findOne({
            where:{
              TeamId:this.TeamId,
              position:value,
            }
          })
          .then(function(err, row){
            if(row || err){
              return next('position already filled')
            }
            return next()
          })
        }
      }
    }
  }, {});
  UserTeam.associate = function(models) {
    // associations can be defined here
    UserTeam.belongsTo(models.User)
    UserTeam.belongsTo(models.Team)
  };
  return UserTeam;
};
