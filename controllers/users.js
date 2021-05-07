/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年04月30日
 * @LastEditTime: 2021年05月07日
 */
let sqlConnect = require('../utils/dbconfig');
let fieldFormat = require('../utils/common');

// 获取用户列表
const getUserList = async function (req, res, next) {
	const { pageNum, pageSize, userName = '' } = req.body;
	let sql = `SELECT user_id,user_name,create_time,user_sex,user_phone,user_age FROM user_info WHERE user_name LIKE concat('%',?,'%') limit ?,?`;
	let sqlArr = [userName, (pageNum - 1) * pageSize, +pageSize];
	let countSql = `SELECT COUNT(*) count FROM user_info WHERE user_name LIKE concat('%',?,'%')`;
	let countArr = [userName];
	try {
		const rows = await sqlConnect(sql, sqlArr);
		const countResult = await sqlConnect(countSql, countArr);
		res.send({
			code: 200,
			data: { count: countResult[0].count, data: fieldFormat(rows) },
		});
	} catch (error) {
		res.send({ code: 0, msg: error });
	}
};
// 模糊查找
const fuzzySearch = async function (req, res, next) {
	const { keyword } = req.body;
	let like =
		`FROM user_info WHERE user_name LIKE concat('%','${keyword}','%') ` +
		`OR create_time  LIKE concat('%','${keyword}','%') ` +
		`OR user_sex LIKE concat('%','${keyword}','%') ` +
		`OR user_phone LIKE concat('%','${keyword}','%') ` +
		`OR user_age LIKE concat('%','${keyword}','%') `;
	let sql =
		`SELECT user_id,user_name,create_time,user_sex,user_phone,user_age ` +
		like +
		`limit 0,10`;
	try {
		const rows = await sqlConnect(sql);
		res.send({
			code: 200,
			data: { data: fieldFormat(rows) },
		});
	} catch (error) {
		res.send({ code: 0, error: error });
	}
};
//添加用户
const addUser = async function (req, res, next) {
	const { userName, userSex, userAge, userPhone, password } = req.body;
	let sql =
		'INSERT INTO user_info(user_name,user_sex,user_age,user_phone,password) VALUES (?,?,?,?,?)';
	let sqlArr = [userName, userSex, userAge, userPhone, password];
	try {
		const rows = await sqlConnect(sql, sqlArr);
		res.send({ code: 200, msg: '添加成功！' });
	} catch (error) {
		res.send({ code: 0, msg: error });
	}
};
// 编辑用户
const updateUser = async function (req, res, next) {
	const { userId, userName, userSex, userAge, userPhone } = req.body;
	let sql =
		'UPDATE user_info SET user_name=?,user_sex=?,user_age=?,user_phone=? WHERE user_id=?';
	let sqlArr = [userName, userSex, userAge, userPhone, userId];
	try {
		const rows = await sqlConnect(sql, sqlArr);
		res.send({ code: 200, msg: '编辑成功！' });
	} catch (error) {
		res.send({ code: 0, msg: error });
	}
};
// 删除用户
const deleteUser = async function (req, res, next) {
	const { userId } = req.body;
	let sql = 'DELETE FROM user_info WHERE user_id=?';
	// let sql = 'INSERT user_info set user_name=?,user_phone=?,user_sex=?,password=?';
	let sqlArr = [userId];
	try {
		const rows = await sqlConnect(sql, sqlArr);
		res.send({ code: 200, msg: '删除成功！' });
	} catch (error) {
		res.send({ code: 0, msg: error });
	}
};

module.exports = {
	getUserList,
	addUser,
	fuzzySearch,
	deleteUser,
	updateUser,
};
