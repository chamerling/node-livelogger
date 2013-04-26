//
// Simple client which sends valid log messages to the server defined in the ../config.js file
//
// Christophe Hamerling - christophe.hamerling@gmail.com
//

var request = require('request')
  , conf = require('../config');

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



