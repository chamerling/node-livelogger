//
// Christophe Hamerling - christophe.hamerling@gmail.com
//

// a set of additional external modules to load. Must be in the project node_modules ie dependencies...
// TODO : Have a rules repository or someting more generic based on a rules engine...
var rules = ['foo', 'bar'];

// define valid logger levels, if no level, let them all...
var levels = {};

module.exports = {
  port : process.env.PORT || 3000,
  host : process.env.HOSTNAME || 'localhost',
  rules : rules,
  levels : levels,
  mongo : {
    enable : false,
    uri : process.env.MONGO_URI || 'mongodb://localhost:27017/livelogger'
  },

  // notifiers at the app level.
  // Rules may use this configuration of have their own config and dependencies
  notifiers : {
    mail : {

    },
    irc : {

    }
  }
}