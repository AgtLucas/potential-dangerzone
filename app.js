var express        = require('express')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')

  , bulls = require('./routes/bulls')
  , weighings = require('./routes/weighings')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}


app.get('/Danger/bulls', bulls.findAll)
app.get('/Danger/bulls/:earring', bulls.find)
app.post('/Danger/bulls', bulls.create)
app.put('/Danger/bulls/:earring', bulls.update)
app.del('/Danger/bulls/:earring', bulls.destroy)

app.get('/Danger/weighings', weighings.findAll)
app.get('/Danger/weighings/:id', weighings.find)
app.post('/Danger/weighings', weighings.create)
app.put('/Danger/weighings/:id', weighings.update)
app.del('/Danger/weighings/:id', weighings.destroy)


db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
