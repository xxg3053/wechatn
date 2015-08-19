var express = require('express'),
    wechat = require('wechat'),
    http = require('http');

var app = express();
var server = http.createServer(app);

var config = {
  token: 'KENFOWEIXIN',
  appid: 'wx74d59fbce4fde733',
  encodingAESKey: '0dgy8Ry4aEjD0b4M0NbVlZAjZ2sB8YX4zaZBnritvI8'
};

app.set('port', process.env.VCAP_APP_PORT || 3000);
app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {

  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  //console.log('message'+JSON.stringify(message));
  //ToUserName  FromUserName  CreateTime MsgType Content MsgId
  
  if (message.Context === 'hh') {
    // 回复屌丝(普通回复)
    res.reply('嘿嘿！');
  } else if (message.Context === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.Context=== 'music') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else if (message.Context=== 'list'){
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
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));

server.listen(app.get('port'), function () {
    console.log('wechat listening on port ' + app.get('port'));
});