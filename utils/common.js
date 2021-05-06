/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年05月03日
 * @LastEditTime: 2021年05月06日
 */

// 下划线转换驼峰
function toHump(name) {
	return name.replace(/\_(\w)/g, function (all, letter) {
		return letter.toUpperCase();
	});
}
// 驼峰转换下划线
function toLine(name) {
	return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}
// 数据转换处理,true,默认转驼峰
function fieldFormat(data, humpOrLine = true) {
	if (data.length === 0) {
		return data;
	}
	let flag = Array.isArray(data);
	const result = flag ? [] : {};
	if (flag) {
		// 如果每个数组item的keys不同将其放到data.forEach里面s
		const keys = Object.keys(data[0]).map((item) => {
			return humpOrLine ? toHump(item) : toLine(item);
		});
		data.forEach((arrItem, i) => {
			const values = Object.values(arrItem);
			result[i] = {};
			keys.forEach((item, j) => {
				result[i][item] = values[j];
			});
		});
		return result;
	} else {
		const keys = Object.keys(data).map((item) => {
			return humpOrLine ? toHump(item) : toLine(item);
		});
		const values = Object.values(data);
		keys.forEach((item, j) => {
			result[item] = values[j];
		});
		return result;
	}
}
module.exports = fieldFormat;
