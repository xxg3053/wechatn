/**
 * 模型
 */

var mongoose = require('mongoose');
var MessageSchema = require('../schemas/message');

var message = mongoose.model('Message',MessageSchema);

message.deleteById = function(id){
	this.remove({_id:id},function(err){
		if(err){
			console.log(err);
			return false;
		}else{
			return true;
		}

	})
}
module.exports = message;