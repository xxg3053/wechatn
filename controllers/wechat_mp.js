var wechat = require('wechat'),
    config = require('../config');


exports.reply = wechat(config.mp, wechat.text(function (message, req, res){
	console.log(message);
    var input = (message.Content || '').trim();

     if (input === 'hh') {
          res.reply('嘿嘿！');
      } else if (input === 'text') {
        res.reply({
          content: 'text object',
          type: 'text'
        });
      } else if (input=== 'music') {
          res.reply({
            type: "music",
            content: {
              title: "来段音乐吧",
              description: "吻别",
              musicUrl: "http://7xky7l.com1.z0.glb.clouddn.com/wb.mp3",
              hqMusicUrl: "http://7xky7l.com1.z0.glb.clouddn.com/wb.mp3"
              ///thumbMediaId: "thisThumbMediaId"
            }
          });
      } else if (input=== 'list'){
           var List = wechat.List;
            List.add('view', [
              ['回复{a}查看我的性别', function (info, req, res) {
                res.reply('我是个妹纸哟');
              }],
              ['回复{b}查看我的年龄', function (info, req, res) {
                res.reply('我今年18岁');
              }],
              ['回复{c}查看我的性取向', '这样的事情怎么好意思告诉你啦- -']
            ]);

            res.wait('view');

      }else {
        res.reply([
          {
            title: '我美吗？',
            description: '其实这是个显而易见的事情，你说是吗？',
            picurl: 'http://7xky7l.com1.z0.glb.clouddn.com/IMG_7576.JPG',
            url: config.remote + "/m/violet"
          }
        ]);
      }

	}).image(function (message, req, res, next) {
	  res.reply('还没想好图片怎么处理啦。');
	}).voice(function (message, req, res, next) {
	  // TODO
	  res.reply('心情不好，不想搭理你。');
	}).video(function (message, req, res, next) {
	  // TODO
	  res.reply('来看一场电影吧。');
	}).location(function (message, req, res, next) {
	  // TODO
	   res.reply('想和我约会吗，不要的啦。');
	}).link(function (message, req, res, next) {
	  // TODO
	  res.reply('点连接进来的是吧！');
	}).event(function (message, req, res, next) {
	  if (message.Event === 'subscribe'){
	        res.reply('@ 翻译 & 查询 # 快递 ! \n谢谢关注~');
	   }else if(message.Event === 'unsubscribe'){
	      res.reply('亲爱的，别走....');
	   }

	}).device_text(function (message, req, res, next) {
	  // TODO
	}).device_event(function (message, req, res, next) {
	     
	}));
