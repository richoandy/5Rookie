const model = require('../models');

class ControllerUser {
  static list() {
    return model.User.findAll({
      order: [
        ['id', 'ASC']
      ]
    });
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

  static update(user, nickname, password, salt, email, position, medal, star, link_steam) {
    return user.update({
      nickname: nickname,
      password: password,
      salt: salt,
      email: email,
      position: position,
      medal: medal,
      star: star,
      link_steam: link_steam
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
