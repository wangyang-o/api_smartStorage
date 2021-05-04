/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年04月30日
 * @LastEditTime: 2021年05月04日
 */
let sqlConnect = require('../utils/dbconfig');
let fieldFormat = require('../utils/common');

// 获取用户列表
const getUserList = async function (req, res, next) {
	let sql = 'select * from user_info';
	let sqlArr = [];
	try {
		const rows = await sqlConnect(sql, sqlArr);
		res.send({ code: 200, data: fieldFormat(rows) });
	} catch (error) {
		res.send({ code: 0, msg: error });
	}
};
const addUser = async function (req, res, next) {
	const { user_name, password } = req.body;
	let sql = 'insert user_info set user_name=?,password=?';
	// let sql = 'INSERT user_info set user_name=?,user_phone=?,user_sex=?,password=?';
	let sqlArr = [user_name, password];
	try {
		const rows = await sqlConnect(sql, sqlArr);
		res.send({ code: 200, msg: '添加成功！' });
	} catch (error) {
		res.send({ code: 0, msg: error });
	}
};
module.exports = {
	getUserList,
	addUser,
};
