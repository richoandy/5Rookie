const model = require('../models');

class ControllerUser {
  static list() {
    return model.User.findAll({
      include: [
        {
          model: model.Team
        }
      ],
      order: [
        ['id', 'ASC']
      ]
    });
  }

  static findEmailLogin(email) {
    return model.User.findOne({
      where: {
        email: email
      }
    })
  }

  static findById(id) {
    return model.User.findById(id);
  }

  static addFavoriteHero(user, hero) {
    let herofavorite = model.HeroFavorite.build({
      UserId: user.id,
      HeroId: hero.id
    })
    return herofavorite.save();
  }

  static inviteTeamMember(inviter, invitee, team) {
    let invitation = model.Invitation.build({
      inviter_id: inviter.id,
      invitee_id: invitee.id,
      teamId: team.id
    })
    return invitation.save();
  }

  static add(obj) {
    let user = model.User.build({
      nickname: obj.nickname,
      password: obj.password,
      salt: obj.salt,
      email: obj.email,
      position: obj.position,
      medal: obj.medal,
      star: obj.star,
      link_steam: obj.link_steam
    })
    return user.save();
  }

  static update(updateObj, id) {
    return model.User.findById(id)
    .then(function(user){
      return user.update(updateObj)
    })
  }

  static delete(id) {
    return model.User.findById(id)
    .then(function(User) {
      return User.destroy()
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

module.exports = ControllerUser;
