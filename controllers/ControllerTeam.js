const model = require('../models');

class ControllerTeam {
  static list() {
    return model.Team.findAll({
      order: [
        ['id', 'ASC']
      ]
    });
  }

  static avaliableTeam(userPosition) {
    return model.Team.findAll({
      include: [
        {
          model: model.UserTeam,
          where: {
            position: {
              [Op.notIn]: [userPosition],
            }
          }
        }
      ]
    })
  }

  static findById(id) {
    return model.Team.findById(id);
  }

  static addMember(team, user) {
    let userteam = model.UserTeam.build({
      TeamId: team.id,
      UserId: user.id
    })
    return userteam.save();
  }

  static add(obj) {
    let team = model.Team.build({
      nama: obj.nama,
      id_ketua: obj.id_ketua
    })
    return team.save();
  }

  static update(team, nama, id_ketua) {
    return team.update({
      nama: nama,
      id_ketua: id_ketua
    })
  }

  static delete(id) {
    return model.Team.findById(id)
    .then(function(team) {
      return team.destroy()
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

module.exports = ControllerTeam;
