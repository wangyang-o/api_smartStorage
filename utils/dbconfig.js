/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年04月29日
 * @LastEditTime: 2021年05月03日
 */
const mysql = require('mysql');
const pool = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '123456',
	database: 'smart_storage_db',
});

const sqlConnect = function (sql, sqlArr) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				connection.query(sql, sqlArr, (err, rows) => {
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
					// 结束会话
					connection.release();
				});
			}
		});
	});
};
module.exports = sqlConnect;
// module.exports = {
// 	config: {
// 		host: 'localhost',
// 		port: '3306',
// 		user: 'root',
// 		password: '123456',
// 		database: 'smart_storage_db',
// 	},
// 	sqlConnect: function (sql, sqlArr, callback) {
// 		let pool = mysql.createPool(this.config);
// 		pool.getConnection((err, conn) => {
// 			console.log('12345');
// 			if (err) {
// 				console.log('连接失败');
// 				return;
// 			}
// 			conn.query(sql, sqlArr, callback);
// 			conn.release();
// 		});
// 	},
// };
