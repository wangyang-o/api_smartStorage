/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年04月29日
 * @LastEditTime: 2021年05月03日
 */
var express = require('express');
var router = express.Router();
let users = require('../controllers/users');

/* GET users listing. */
router.get('/getUserList', users.getUserList);
router.post('/addUser', users.addUser);

module.exports = router;
