'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invitation = sequelize.define('Invitation', {
    inviter_id: DataTypes.INTEGER,
    invitee_id: DataTypes.INTEGER,
    TeamId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    action: DataTypes.STRING,
  }, {});
  Invitation.associate = function(models) {
    // associations can be defined here

    Invitation.belongsTo(models.User, {
      foreignKey: "invitee_id"
    })

    Invitation.belongsTo(models.Team)
  };
  return Invitation;
};
