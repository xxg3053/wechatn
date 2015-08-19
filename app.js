var express = require('express'),
    wechat = require('wechat'),
    http = require('http'),
    connect = require('connect'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();
var server = http.createServer(app);

var config = {
  token: 'KENFOWEIXIN',
  appid: 'wx74d59fbce4fde733',
  encodingAESKey: '0dgy8Ry4aEjD0b4M0NbVlZAjZ2sB8YX4zaZBnritvI8'
};

app.set('port', process.env.VCAP_APP_PORT || 3000);
app.use(express.query());
//WXSession支持
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat', 
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
  }));

app.use('/wechat', wechat('KENFOWEIXIN').text(function (message, req, res, next) {
     if (message.Content === 'hh') {
          res.reply('嘿嘿！');
      } else if (message.Content === 'text') {
        res.reply({
          content: 'text object',
          type: 'text'
        });
      } else if (message.Content=== 'music') {
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
      } else if (message.Content=== 'list'){
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
            url: 'http://104.131.144.192/'
          }
        ]);
      }

}).image(function (message, req, res, next) {
  // TODO
}).voice(function (message, req, res, next) {
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
}).link(function (message, req, res, next) {
  // TODO
}).event(function (message, req, res, next) {
  // TODO
}).device_text(function (message, req, res, next) {
  // TODO
}).device_event(function (message, req, res, next) {
  // TODO
}).middlewarify())

server.listen(app.get('port'), function () {
    console.log('wechat listening on port ' + app.get('port'));
});