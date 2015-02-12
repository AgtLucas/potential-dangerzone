var express        = require('express')
  , app            = express()
  , http           = require('http').Server(app)
  , io = require('socket.io')
  , io = io.listen(http)
  , net = require('net')
  , tcpServer = net.createServer()
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , path           = require('path')
  , db             = require('./models')
  , passport = require('passport')
  , flash = require('connect-flash')
  , LocalStrategy = require('passport-local').Strategy
  , users = require('./routes/user')
  , login = require('./routes/login')
  , bulls = require('./routes/bulls')
  , weighings = require('./routes/weighings');

app.set('port', process.env.PORT || 3000)
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'public')))

app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'bois-rede-top' }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

if ('development' === app.get('env')) {
  app.use(errorHandler())
}

function findById(id, fn) {
  db.User.find({ where: { id: id } }).success(function(entity) {
    if (entity) {
      fn(null, entity);
    } else {
      fn(new Error(id));
    }
  });
}

function findByUsername(username, password, fn) {
  db.User.find({ where: { email: username, password: password } }).success(function(entity) {
    if (entity) {
      return fn(null, entity);
    } else {
      return fn(null, null);
    }
  });
}

function naoAutenticado(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send({ error: 1 });
}

function naoAutenticadoHome(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      findByUsername(username, password, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user == null) {
          return done(null, null);
        }
        return done(null, user);
      })
    });
  }
));

app.get('/users/info', naoAutenticado, function(req, res, next){
  res.json({
    id: req.user.id,
    nome: req.user.nome,
    email: req.user.email,
    password: req.user.password
  });
});

app.get('/', function(req, res, next){
  res.sendfile('public/index.html', { user: req.user, message: req.flash('error') });
});

app.get('/home', naoAutenticadoHome, function(req, res, next){
  res.sendfile('public/home.html', { user: req.user });
});

app.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
  function(req, res, next) {
    res.json({ success: 1})
});

app.get('/views/home/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/home/index.html', { user: req.user });
});

app.get('/views/user/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/user/index.html', { user: req.user });
});

app.get('/views/boi/new/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/boi/new/index.html', { user: req.user });
});

app.get('/views/boi/abatido/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/boi/abatido/index.html', { user: req.user });
});

app.get('/views/boi/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/boi/index.html', { user: req.user });
});

app.get('/views/pesagem/new/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/pesagem/new/index.html', { user: req.user });
});

app.get('/views/pesagem/individual/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/pesagem/individual/index.html', { user: req.user });
});

app.get('/views/pesagem/geral/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/pesagem/geral/index.html', { user: req.user });
});

app.get('/views/grafico/boi/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/grafico/boi/index.html', { user: req.user });
});

app.get('/views/grafico/pesagem/:page', naoAutenticado, function(req, res, next){
  res.sendfile('public/views/grafico/pesagem/index.html', { user: req.user });
});

app.get('/datepicker/datepicker.tpl.html', naoAutenticado, function(req, res, next){
  res.sendfile('public/lib/angular-strap/template/datepicker.html', { user: req.user });
});

app.get('/typeahead/typeahead.tpl.html', naoAutenticado, function(req, res, next){
  res.sendfile('public/lib/angular-strap/template/typeahead.html', { user: req.user });
});

app.get('/meus-dados', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/new-pesagem', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/new-boi', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/todos-boi', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/abatidos-boi', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/geral-pesagem', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/individual-pesagem', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/grafico-boi', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/grafico-pesagem', naoAutenticado, function(req, res, next){
  res.redirect('/home');
});

app.get('/bois', bulls.findAll)
app.get('/bois-geral', naoAutenticado, bulls.all)
app.get('/bois-simples', naoAutenticado, bulls._findAll)
app.get('/bois-vivos', naoAutenticado, bulls.findAllVivos)
app.get('/bois-vivos-select/:expression', naoAutenticado, bulls.findAllVivosSelect)
app.get('/bois-abatidos', naoAutenticado, bulls.findAllAbatidos)
app.get('/pesagem-vivos', naoAutenticado, weighings.findAllVivos)

app.get('/pesagem/:id', naoAutenticado, weighings.update)
app.get('/bois/:id', naoAutenticado, bulls.find)

app.post('/users', users.newUser)
app.post('/new-boi', naoAutenticado, bulls.create)
app.post('/new-pesagem', naoAutenticado, weighings.create)

app.put('/users/:id', naoAutenticado, users.update)
app.put('/abater/:id', naoAutenticado, bulls.abater)
app.put('/reviver/:id', naoAutenticado, bulls.reviver)

app.delete('/pesagem/:id', naoAutenticado, weighings.destroy)

db.sequelize.sync({ force: false }).complete(function(err) {
  if (err) {
    throw err
  } else {
    http.listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'))
    });
  }
})