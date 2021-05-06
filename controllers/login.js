/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年05月03日
 * @LastEditTime: 2021年05月05日
 */
let sqlConnect = require('../utils/dbconfig');
let fieldFormat = require('../utils/common');

const validSession = function (req, res, next) {
	//判断session是否为true
	if (req.session.login) {
		res.send({ code: 200, isLogin: true });
	} else {
		res.send({ code: 200, isLogin: false });
	}
};
const toLogin = async function (req, res, next) {
	const { user_name, password } = fieldFormat(req.body, false);
	let sql =
		'SELECT user_id,user_name,create_time,user_sex,user_phone FROM user_info WHERE user_name =? AND password=?';
	// let sql = 'INSERT user_info set user_name=?,user_phone=?,user_sex=?,password=?';
	let sqlArr = [user_name, password];

	try {
		const rows = await sqlConnect(sql, sqlArr);
		if (rows) {
			// 设置session
			req.session.login = true;
			res.send({ code: 200, data: fieldFormat(rows[0]), msg: '登录成功！' });
		}
	} catch (error) {
		res.send({ code: 0, msg: '账号或密码错误！', error: error });
	}
};
const logout = async function (req, res, next) {
	req.session.login = false;
	res.send({ code: 200, msg: '已注销登录！' });
};
module.exports = {
	validSession,
	toLogin,
	logout,
};
