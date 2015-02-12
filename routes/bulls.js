var db = require('../models')

exports.all = function(req, res) {
  db.Bull.findAll({include: [db.Weighing]}).success(function(entities) {
    res.json(entities)
  })
}

exports.findAll = function(req, res) {
  db.Bull.findAll({
    where: {
      status: 1
    },
    include: [{
        model: db.Weighing
      }
    ],
    order: 'earring ASC, Weighings.createdAt ASC'
  }).success(function(entities) {
    res.json(entities)
  })
}

exports._findAll = function(req, res) {
  db.Bull.findAll().success(function(entities) {
    res.json(entities)
  })
}

exports.findAllAbatidos = function(req, res) {
  db.Bull.findAll({where: {status: 2}, include: [db.Weighing]}).success(function(entities) {
    res.json(entities)
  })
}

exports.findAllVivos = function(req, res) {
  db.Bull.findAll({where: { status: 1 }}).success(function(entities) {
    res.json(entities)
  });
};

exports.findAllVivosSelect = function(req, res) {
  db.Bull.findAll({
    where: {
      status: 1,
      earring: {
        like: req.param('expression') + '%'
      }
    },
    attributes: ['id', 'earring'],
    order: 'earring ASC'
  }).success(function(entities) {
    res.json(entities)
  });
}

exports.find = function(req, res) {
  db.Bull.find({
    where: {
      id: req.param('id')
    },
    include: [db.Weighing],
    order: 'earring ASC, Weighings.createdAt ASC'
  }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.create = function(req, res) {
  if(!(!isNaN(parseFloat(req.body.brinco)) && isFinite(req.body.brinco))){
    res.send({
      error: 2,
      message: "Brinco inválido!"
    })
  }
  db.Bull.find({
    where: {
      earring: req.body.brinco
    }
  }).success(function(entity) {
    if (entity) {
      res.send({
        error: 2,
        message: "Boi já cadastrado!"
      })
    } else {
      db.Bull.create({
        id: "",
        earring: req.body.brinco,
        status: 1,
        slaughter: '2000-01-01',
        birthday: req.body.nascimento,
        createdAt: new Date(),
        updateAt: new Date()
      }).success(function(entityBoi) {
        res.json({
          error: 0,
          message: "Salvo com sucesso!"
        })
      }).error(function(entityBoi) {
        console.log(entityBoi);
        res.send({
          error: 2,
          message: "Ocorreu algum erro!"
        })
      })
    }
  })
}

exports.abater = function(req, res) {
  db.Bull.find({
    where: {
      id: req.param('id')
    }
  }).success(function(entity) {
    entity.status = 2;
    entity.slaughter = new Date();
    if (entity) {
      entity.updateAttributes(req.body).success(function(entity) {
        res.json({
          error: 0,
          message: "Abatido com sucesso!"
        })
      })
    } else {
      res.send({
        error: 2,
        message: "Ocorreu algum erro!"
      })
    }
  })
}

exports.reviver = function(req, res) {
  db.Bull.find({
    where: {
      id: req.param('id')
    }
  }).success(function(entity) {
    entity.status = 1;
    if (entity) {
      entity.updateAttributes(req.body).success(function(entity) {
        res.json({
          error: 0,
          message: "Revivido com sucesso!"
        })
      })
    } else {
      res.send({
        error: 2,
        message: "Ocorreu algum erro!"
      })
    }
  })
}

exports.update = function(req, res) {
  db.Bull.find({
    where: {
      earring: req.param('earring')
    }
  }).success(function(entity) {
    if (entity) {
      entity.updateAttributes(req.body).success(function(entity) {
        res.json(entity)
      })
    } else {
      res.send(404)
    }
  })
}

exports.destroy = function(req, res) {
  db.Bull.find({
    where: {
      earring: req.param('earring')
    }
  }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}