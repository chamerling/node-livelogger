//
// Log schema
//
// Christophe Hamerling - christophe.hamerling@gmail.com
//

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var LogSchema = new Schema({
  name : String,
  level : String,
  message : String,
  created_at : { type : Date, default: Date.now },
  receive_at : { type : Date }
}, {
  strict : false
});

LogSchema.plugin(require('mongoose-lifecyle'));

LogSchema.pre('save', function(next) {
  console.log('saving log', this);
  next()
});

module.exports = mongoose.model('Log', LogSchema);