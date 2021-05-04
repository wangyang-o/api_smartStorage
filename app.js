/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年04月29日
 * @LastEditTime: 2021年05月04日
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
//中间件--用于下发session
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// http,服务入口文件
var server = http.createServer(app);
app.use(
	express.urlencoded({
		extended: false,
	}),
);
app.use(cookieParser());
// 以前的bodyParser
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		// 签字
		secret: 'keyboard cat',
		// 强制保存 session 即使它并没有变化,。默认为 true
		resave: false,
		// cookie名称
		name: 'token',
		cookie: { maxAge: 600000 },
		// 强制将未初始化的 session 存储。
		saveUninitialized: true,
	}),
);
// 设置跨域和相应数据格式
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization');
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
	);
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By', ' 3.2.1');
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
	/*让options请求快速返回*/
});
// 登录拦截
app.use('/api', function (req, res, next) {
	if (req.session.login) {
		next();
	} else {
		res.send({ code: 0, msg: '尚未登录！' });
	}
});
app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
// });

// module.exports = app;
server.listen('3000', () => {
	console.log('app is running：http://localhost:3000');
});
