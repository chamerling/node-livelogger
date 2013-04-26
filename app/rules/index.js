//
// Rules loader. Get them all from the current folder or from dependencies.
//
// Christophe Hamerling - christophe.hamerling@gmail.com
//
var fs = require('fs')
  , path = require('path')
  , conf = require('../../config')
  , rules = {}

module.exports.load = load;

function load() {
  // load local rules
  fs.readdirSync(__dirname).forEach(function (file) {
    if (file != 'index.js') {
      var tmp = require(__dirname + '/' + file);
      if (tmp && tmp.name) {
        rules[tmp.name] = tmp.check;
      }
    }
  });

  // load rules from config ie external dependencies
  var externals = conf.rules;
  if (externals) {
    externals.forEach(function(external) {
      try {
        var load = require(external);
        if (load && load.name && load.check && 'function' == typeof load.check) {
          rules[load.name] = load.check;
        } else {
          console.log(external + ' is not a valid rule checker (need name and check(log))')
        }
      } catch (err) {
        console.log('Error while trying to load rule from module', external);
      }
    });
  } else {
    console.log('No externals rules')
  }

  // can also load rules from an external folder...
  // and add a folder listener for live deploys
  // TODO

  return rules;
}

var check = function(log) {
  for(var rule in rules) {
    console.log('- Invoking rule ', rule);
    rules[rule].call(this, log);
  }
}
module.exports.check = check;