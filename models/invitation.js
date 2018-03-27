'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invitation = sequelize.define('Invitation', {
    inviter_id: DataTypes.INTEGER,
    invited_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Invitation.associate = function(models) {
    // associations can be defined here
  };
  return Invitation;
};