//
// Does nothing...
//
// Christophe Hamerling - christophe.hamerling@gmail.com
//

module.exports.check = function(log) {
  console.log('Checking rules on log', JSON.stringify(log, null, 2))
  console.log(log.level)
}

module.exports.name = 'noop'
module.exports.active = active