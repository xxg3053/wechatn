var config = require('./config'),
    mp = require('./controllers/wechat_mp'),
    express = require('express'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    wechat = require('wechat'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    mongoStore = require('connect-mongo')(session),
    morgan = require('morgan');

var app = express();
//连接数据库
var dbUrl = "mongodb://localhost/wechatn";
mongoose.connect(dbUrl)

//格式化提交表单
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//模板引擎
app.set('views','./views/pages');
app.set('view engine','jade');
app.use(serveStatic(__dirname + '/public'));
app.locals.moment = require('moment')//格式化时间
//WXSession支持
app.use(cookieParser());
app.use(session({
    secret: config.secret, 
    store:new mongoStore({
        url:dbUrl,
        collection:'sessions'
    }),
    resave:true,
    saveUninitialized:true

  }));



//导入路由
require('./routes/route')(app);

//启动服务
app.listen(config.port);
console.log('wechat server started on port ' + config.port);