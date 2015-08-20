/**
 * 微信消息模式
 */
var mongoose = require('mongoose');
var MessageSchema = mongoose.Schema({

    ToUserName: String,
    FromUserName: String,
    CreateTime: String,
    MsgType: String,
    Content:String,
    Event: String,
    Latitude: String,
    Longitude: String,
    Precision: String,
    MsgId: String

});

MessageSchema.pre('save',function(next){
	next();
});

//静态方法，对象可以直接调用
MessageSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			//.sort('CreateTime')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
};
module.exports = MessageSchema