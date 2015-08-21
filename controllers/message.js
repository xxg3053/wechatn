/**
 * message 控制器
 */
var Message = require('../models/message');

exports.add = function(ToUserName,FromUserName,CreateTime,MsgType, Content,Event,Latitude,Longitude,Precision,MsgId) {
	var message = new Message({
			ToUserName: ToUserName,
			FromUserName: FromUserName,
			CreateTime: CreateTime,
			MsgType: MsgType,
			Content: Content,
			Event: Event,
			Latitude: Latitude,
			Longitude: Longitude,
			Precision: Precision,
			MsgId: MsgId,
	});
	message.save(function(err,message){
		if(err){
			console.log(err);
		}
		console.log("save message success :"+message);
	});
};

exports.listForWechat = function(callback){
	Message.fetch(function(err,messages){
		if(err){
			console.log(err)
		}
		console.log("find all message : "+ messages);
		callback(JSON.stringify(messages));
	})
};

exports.list = function(req,res){
	Message.fetch(function(err,messages){
		if(err){
			console.log(err)
		}
		// res.render('messagelist',{
		// 	title:'消息列表',
		// 	messages:messages
		// })
	var result = {
		status:200;
		message:"success";
		data:messages;
	};
	
	res.send(JSON.stringify(result));  
	})
}
