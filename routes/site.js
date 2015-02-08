var db = require('../models')

exports.realTime = function(req, res, next) {
  db.Arduino.findAll({ attributes: ['id', 'pin', 'description', 'status', 'labelOn', 'labelOff'] }).success(function(entities) {
    res.json(entities)
  });
};