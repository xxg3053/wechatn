/**
 * message 控制器
 */
var Message = require('../models/message');

exports.save = function(ToUserName,FromUserName,CreateTime,MsgType, Content,Event,Latitude,Longitude,Precision,MsgId) {
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
		status:200,
		message:"success",
		data:messages
	};
	
	res.send(JSON.stringify(result));  
	})
};

exports.detail = function(req,res){
	var id = req.params.id;
	console.log('find one id:'+id);
	Message.findById(id,function(err,message){
		if(err){
			console.log(err);
		}
		var result = {
				status:200,
				message:"success",
				data:message
			};
		res.send(JSON.stringify(result));  
	});
};

exports.delete = function(req,res){
	var id = req.params.id;
	console.log('delete one id:'+id);
	if(Message.deleteById(id)){
		var result = {
					status:200,
					message:"delete success",
					data:""
				};
		res.send(JSON.stringify(result)); 
	}
};
