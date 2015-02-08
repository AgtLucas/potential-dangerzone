var db = require('../models')
var Sequelize = require('sequelize')

function _getDate(data){
  var _final = data.getFullYear();
  if(parseInt(data.getMonth() + 1) < 10){
    _final = _final + "0" + parseInt(data.getMonth() + 1);
  }else{
    _final = _final + parseInt(data.getMonth() + 1);
  }
  if(parseInt(data.getDate()) < 10){
    _final = _final + "0" + parseInt(data.getDate());
  }else{
    _final = _final + parseInt(data.getDate());
  }
  return _final;
};

function execute(listArduinos, listClients,  _entities, _length, now){
  if(now < _length){
    db.Arduino.find({
      where: {
        id: _entities[now].ArduinoId
      }
    }).success(function(entity) {
      entity.status = _entities[now].status;
      entity.updateAttributes(entity).success(function(){
        for (c in listClients) {
          listClients[c].emit('message', entity);
        };
        execute(listArduinos, _entities, _length, now + 1);
      });
    });
  }
};

exports.findAll = function(req, res, next) {
  var retorno = {};
  db.Task.findAll({
    order: 'date ASC, time ASC',
    include: [ { model: db.Arduino } ],
    where: Sequelize.or({
      repeat: '1'
    }, Sequelize.or({
        date: _getDate(new Date())
      })
    )
  }).success(function(entitiesToday) {
    retorno.today = entitiesToday;
    db.Task.findAll({
      order: 'date ASC',
      include: [ { model: db.Arduino } ],
      limit: 10,
      where: {
        date: {
          lt: _getDate(new Date())
        },
        repeat: {
          lte: '0'
        }
      }
    }).success(function(entitiesFinished) {
      retorno.finished = entitiesFinished;
      db.Task.findAll({
        order: 'date ASC',
        include: [ { model: db.Arduino } ],
        where: {
          date: {
            gt: _getDate(new Date())
          },
          repeat: {
            lte: '0'
          }
        }
      }).success(function(entitiesNext) {
        retorno.nexts = entitiesNext;
        res.json(retorno)
      });
    });
  });
}

exports.execute = function(listArduinos, listClients, time) {
  db.Task.findAll({
    where: {
      date: _getDate(new Date()),
      time: time
    }
  }).success(function(entities) {
    execute(listArduinos, listClients, entities, entities.length, 0);
  });
}

exports.toogleRepeat = function(req, res, next) {
  db.Task.find({ where: { id: req.param('id') } }).success(function(entity) {
    if(entity.repeat == "0"){
      entity.repeat = "1";
    }else{
      entity.repeat = "0";
    }
    entity.updateAttributes(entity).success(function(entity) {
      res.send(204)
    });
  })
}

exports.persist = function(req, res, next) {
  req.body.repeat = 0;
  req.body.date = req.body.date.split("-")[0] + req.body.date.split("-")[1] + req.body.date.split("-")[2];
  db.Task.create(req.body).success(function(_entity) {
    res.json({ error: 0, message: "Salvo com sucesso!" })
  });
}

exports.delete = function(req, res, next) {
  db.Task.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}