/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年04月29日
 * @LastEditTime: 2021年05月04日
 */
let express = require('express');
let router = express.Router();
let login = require('../controllers/login');

/* GET home page. */
// router.get('/', users.getUsers);
//验证是否登录
router.get('/isLogin', login.validSession);
router.post('/login', login.toLogin);
router.get('/logout', login.logout);

module.exports = router;
