var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , sequelize = new Sequelize('redetop', 'root', 'root', {
      dialect: "mysql"
    })
  , db        = {}
  , Bull   = sequelize.import(__dirname + "/Bull")
  , Weighing      = sequelize.import(__dirname + "/Weighing")

  Bull.hasMany(Weighing)
  Weighing.belongsTo(Bull)

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
    console.log(db[modelName])
    db[modelName].associate(db)
})

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)