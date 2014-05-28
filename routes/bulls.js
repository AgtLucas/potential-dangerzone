var db = require('../models')

exports.findAll = function(req, res) {

  db.Bull.findAll({ include: [ db.Weighing ] }).success(function(entities) {
    res.json(entities)
  })
}

exports.find = function(req, res) {
  db.Bull.find({ where: { earring: req.param('earring') } }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.create = function(req, res) {
  db.Bull.create(req.body).success(function(entity) {
    res.statusCode = 201
    res.json(entity)
  })
}

exports.update = function(req, res) {
  db.Bull.find({ where: { earring: req.param('earring') } }).success(function(entity) {
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
  db.Bull.find({ where: { earring: req.param('earring') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}
