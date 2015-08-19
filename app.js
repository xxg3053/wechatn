var config = require('./config'),
    mp = require('./controllers/wechat_mp'),
    express = require('express'),
    wechat = require('wechat'),
    http = require('http'),
    connect = require('connect'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();
var server = http.createServer(app);


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

app.use('/wechat', mp.reply);

app.use('/', function (req, res) {
  res.writeHead(200);
  res.end('welcome to kenfo’s world');
});

server.listen(app.get('port'), function () {
    console.log('wechat listening on port ' + app.get('port'));
});