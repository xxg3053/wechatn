var WechatCtrl = require('../controllers/wechat_mp'),
	VioletCtrl = require('../controllers/violet');

module.exports = function(app){
	app.get('/', function (req, res) {
	  res.writeHead(200);
	  var str = "<h1>welcome to kenfo’s world !</h1>" +
	  			"<img src='http://7xky7l.com1.z0.glb.clouddn.com/wechat_gg.jpg'/>";
	  res.end(str);
	});
	//微信接口
	app.get('/wechat', WechatCtrl.reply);
	//mobile
	app.get('/m/violet',VioletCtrl.list)
};