module.exports = function(sequelize, DataTypes) {
  var Weighing = sequelize.define('Weighing', {

    weight: {
      type: DataTypes.FLOAT,
      validate: {
        notNull: true,



      },

    },

    earring: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,



      },

    },

  }, {
    classMethods: {
      associate: function(models) {
        Weighing.belongsTo(models.Bull)
      }
    }
  })

  return Weighing
}
