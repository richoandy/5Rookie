const model = require('../models');

class ControllerHero {
  static list() {
    return model.Hero.findAll({
      order: [
        ['id', 'ASC']
      ]
    });
  }

  static findById(id) {
    return model.Hero.findById(id);
  }

  static add(obj) {
    let hero = model.Hero.build({
      nama: obj.nama,
      type: obj.type
    })
    return hero.save();
  }

  static update(hero, nama, type) {
    return hero.update({
      nama: nama,
      type: type
    })
  }

  static delete(id) {
    return model.Hero.findById(id)
    .then(function(Hero) {
      return Hero.destroy()
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

module.exports = ControllerHero;
