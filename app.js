var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
// 业主
var luntan=require('./routes/luntan');
//房屋租赁
var chuzu=require('./routes/chuzu');
//物业报修
var repair=require('./routes/repair');
//物业组织活动
var activity=require('./routes/activity');
//boss 登录
var bossLogin=require('./routes/bossLogin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// 业主
app.use('/luntan',luntan);
//业主房屋租赁
app.use('/chuzu',chuzu);
//物业报修
app.use('/repair',repair);
//物业组织活动
app.use('/activity',activity);
//boss 登录首页
app.use('/bossLogin',bossLogin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//boss端接口



//创建端口号为8005
app.listen('8005',function(){
  console.log('sevve start.....')
});
module.exports = app;
