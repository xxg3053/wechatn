var config = require('./config'),
    mp = require('./controllers/wechat_mp'),
    express = require('express'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    wechat = require('wechat'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();
//格式化提交表单
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//模板引擎
app.set('views','./views/pages');
app.set('view engine','jade');
app.use(serveStatic(__dirname + 'public'));
app.locals.moment = require('moment')//格式化时间
//WXSession支持
app.use(cookieParser());
app.use(session({
    secret: config.secret, 
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
  }));

//导入路由
require('./routes/route')(app);

//启动服务
app.listen(config.port);
console.log('wechat server started on port ' + config.port);