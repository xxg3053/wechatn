var WechatCtrl = require('../controllers/wechat_mp'),
	VioletCtrl = require('../controllers/violet'),
	MessageCtrl = require('../controllers/message');

module.exports = function(app){
	app.get('/', function (req, res) {
	  res.writeHead(200);
	  var str = "<h1>welcome to kenfo’s world !</h1>" +
	  			"<img src='http://7xky7l.com1.z0.glb.clouddn.com/wechat_gg.jpg'/>";
	  res.end(str);
	});
	//微信接口
	app.use('/wechat', WechatCtrl.reply);
	//mobile
	app.get('/m/violet',VioletCtrl.list);
	//pc message manager
	app.get('/message',MessageCtrl.list);
	app.get('/message/:id',MessageCtrl.detail);
	app.delete('/message/:id',MessageCtrl.delete);

	/*****************测试 restful风格  ***************************************/ 
	//定义一个集合资源
	var map = {"1":{id:1,name:"test"},"2":{id:2,name:"test"}} 
	app.get('/devices',function(req, res){ //Restful Get方法,查找整个集合资源  
	    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
	    res.send(map)
	})  
	app.get('/devices/:id',function(req, res){ //Restful Get方法,查找一个单一资源  
	    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
	    res.send(map[req.param('id')])  
	    //console.log(req.param('id'))  
	})  
	app.post('/devices/', function(req, res){ //Restful Post方法,创建一个单一资源  
	    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
	   // map[req.body.id] = req.body  
	    res.send({status:"post success"}) //id 一般由数据库产生  
	})  
	app.put('/devices/:id', function(req, res){ //Restful Put方法,更新一个单一资源  
	    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
	    //map[req.body.id] = req.body  
	    res.send({status:"update success"});  
	})  
	app.delete('/devices/:id',function(req, res){ //Restful Delete方法,删除一个单一资源  
	    res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
	    //delete map[req.param('id')]  
	    res.send({status:"delete success"}) 
	})
	/******************restful 结束***************************************/
};