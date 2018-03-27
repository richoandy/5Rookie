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

  static add(obj) {
    let user = model.User.build({
      nickname: obj.nickname,
      password: obj.password,
      salt: obj.salt,
      email: obj.email,
      posisi: obj.posisi,
      medal: obj.medal,
      star: obj.star,
      link_steam: obj.link_steam
    })
    return user.save();
  }

  static update(user, nickname, password, salt, email, posisi, medal, star, link_steam) {
    return user.update({
      nickname: nickname,
      password: password,
      salt: salt,
      email: email,
      posisi: posisi,
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
