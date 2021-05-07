/*
 * @Descripttion:
 * @Author: wy
 * @Date: 2021年04月29日
 * @LastEditTime: 2021年05月07日
 */
var express = require('express');
var router = express.Router();
let users = require('../controllers/users');

/* GET users listing. */
router.post('/getUserList', users.getUserList);
router.post('/fuzzySearch', users.fuzzySearch);
router.post('/addUser', users.addUser);
router.delete('/deleteUser', users.deleteUser);
router.post('/updateUser', users.updateUser);

module.exports = router;
