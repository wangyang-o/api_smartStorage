/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年04月29日
 * @LastEditTime: 2021年05月06日
 */
var express = require('express');
var router = express.Router();
let users = require('../controllers/users');

/* GET users listing. */
router.post('/getUserList', users.getUserList);
router.post('/fuzzySearch', users.fuzzySearch);
router.post('/addUser', users.addUser);

module.exports = router;
