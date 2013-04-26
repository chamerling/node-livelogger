//
// LiveLogger
//
// Christophe Hamerling - christophe.hamerling@gmail.com
//
var express = require('express')
  , http = require('http')
  , io = require('socket.io')
  , conf = require('./config')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
//  , rules = require('./app/rules');

var stats = {
  nb : 0,
  error : 0
}

if (conf.mongo.enable) {
  mongoose.connect(conf.mongo.uri, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected mongo at', conf.mongo.uri)
      // load models
      var models_path = __dirname + '/app/models'
      fs.readdirSync(models_path).forEach(function (file) {
        require(models_path + '/' + file)
      });
    }
  });
}

app.configure('all', function() {
  app.set('port', conf.port);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.post('/log', function(req, res) {
  if (req.body && req.body.name && req.body.level && req.body.message) {
    stats.nb ++;

    // TODO : Emit event and have listeners (mongo, socket.io, ...)
    // TODO : Check that there are clients...
    // TODO : check rules

    var log = req.body;
    log.received_at = new Date();

    res.send(200);
    io.sockets.emit('log', log);
  } else {
    stats.error ++;
    res.send(400, 'bad log message');
  }
});

server.listen(app.get('port'), function(err) {
  if (err) {
    throw err;
  }
  console.log('Started on', conf.port);
  io.sockets.on('connection', function(socket) {
    console.log('Got a socket.io connection', socket)
  });
});