module.exports = function(sequelize, DataTypes) {
  var Weighing = sequelize.define('Weighing', {
    weight: {
      type: DataTypes.FLOAT,
    },
    earring: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: function(models) {
        Weighing.belongsTo(models.Bull)
      }
    }
  })
  return Weighing;
}
