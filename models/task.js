module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    date: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    repeat: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.Arduino)
      }
    }
  })
  return Task;
}
