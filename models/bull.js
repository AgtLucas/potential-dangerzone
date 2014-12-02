module.exports = function(sequelize, DataTypes) {
  var Bull = sequelize.define('Bull', {
    earring: {
      type: DataTypes.INTEGER,
    },
    birthday: {
      type: DataTypes.DATE,
      get: function() {
        var value = this.getDataValue('birthday')
        return value ? value.toISOString().substring(0, 10) : value
      }
    },
    status: {
      type: DataTypes.INTEGER,
    },
    slaughter: {
      type: DataTypes.DATE,
      get: function() {
        var value = this.getDataValue('slaughter')
        return value ? value.toISOString().substring(0, 10) : value
      }
    },
  }
  , {
    classMethods: {
      associate: function(models) {
        Bull.hasMany(models.Weighing)
      }
    }
  })

  return Bull;
}

