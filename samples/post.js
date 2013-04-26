//
// Simple client which sends valid log messages to the server defined in the ../config.js file
//
// Christophe Hamerling - christophe.hamerling@gmail.com
//

var request = require('request')
  , conf = require('../config');

var levels = ['fine', 'info', 'success', 'warning', 'error'];
var messages = [
  'This is a message A',
  'This is a message B',
  'This is a message C',
  'This is a message D',
  'This is a message E',
  'This is a message F',
  'This is a message G',
  'This is a message H',
  'This is a message I',
  'This is a message J',
  'This is a message K',
  'This is a message L'
]

var payload = {

  // minimal message
  name : 'My logger',
  level : 'INFO',
  message : 'Booh!',

  // extra values...
  thread_id : '12345',
  date : new Date()
}

var send = function() {
  payload.date = new Date()
  payload.message = messages[Math.floor(Math.random() * (messages.length))]
  payload.level = levels[Math.floor(Math.random() * (levels.length))]

  request(
    {
      method : 'post',
      url : 'http://' + conf.host + ':' + conf.port + '/log',
      json: true,
      body : payload
    }, function(err, res, body) {
      if (err) {
        console.log(err);
      } else {
        console.log('response ', res.statusCode);
      }
    }
  );
};
setInterval(send, 1000);



