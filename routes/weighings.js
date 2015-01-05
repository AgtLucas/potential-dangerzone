var db = require('../models')

exports.findAll = function(req, res) {
  db.Weighing.findAll().success(function(entities) {
    res.json(entities)
  })
}


exports.findAllVivos = function(req, res) {
  db.Weighing.findAll().success(function(entities) {
    res.json(entities)
  })
}

exports.find = function(req, res) {
  db.Weighing.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.create = function(req, res) {
  if(!(!isNaN(parseFloat(req.body.brinco.earring)) && isFinite(req.body.brinco.earring))){
    res.send({
      error: 2,
      message: "Brinco inválido!"
    })
  }
  db.Weighing.create({
    id: "",
    weight: req.body.peso,
    earring: req.body.brinco.earring,
    BullId: req.body.brinco.id,
    created: req.body.dataPesagem,
  }).success(function(entityPesagem) {
    res.json({
      error: 0,
      message: "Salvo com sucesso!"
    })
  }).error(function(entityPesagem) {
    res.send({
      error: 2,
      message: "Ocorreu algum erro!"
    })
  })
}

exports.update = function(req, res) {
  db.Weighing.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity._updateAt = new Date("2011-01-01");
      instance.js
      entity.updateAttributes(entity).success(function(entity) {
        res.json(entity)
      })
    } else {
      res.send(404)
    }
  })
}

exports.destroy = function(req, res) {
  db.Weighing.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.json({
          error: 0,
          message: "Excluido com sucesso!"
        })
      })
    } else {
      res.json({
        error: 0,
        message: "Pesagem não encontrada!"
      })
    }
  })
}
