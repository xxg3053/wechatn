/**
 * 模型
 */

var mongoose = require('mongoose');
var MessageSchema = require('../schemas/message');

var message = mongoose.model('Message',MessageSchema);

module.exports = message;