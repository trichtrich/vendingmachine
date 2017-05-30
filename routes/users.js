var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
	res.render('users');
});

router.get('/findUsers', function(req, res, next) {
	models.user.findAll().then(function(users) {
		res.json(users);
	}).catch(function(err) {
		res.send(err);
	});
});

router.post('/createUser', function(req, res, next) {
	var userName = req.body.userName;
	var passWord = req.body.passWord;
	var screenName = req.body.screenName;
	var status = req.body.status;

	models.user.create({ userName: userName, passWord: passWord, screenName: screenName, status: status }).then(function(user) {
		res.json(user);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/deleteUser', function(req, res, next) {
	var id = req.query.id;

	models.user.destroy({ where: { id: id } }).then(function() {
		res.json(id);
	}).catch(function(err) {
		res.send(err);
	});
});


router.post('/updateUser', function(req, res, next) {
	var id = req.query.id;
	var userName = req.body.userName;
	var passWord = req.body.passWord;
	var screenName = req.body.screenName;
	var status = req.body.status;

	models.user.update({ userName: userName, passWord: passWord, screenName: screenName ,status: status}, { where: { id: id } }).then(function() {
		models.user.findOne({ where: { id: id } }).then(function(user) {
			console.log(11111111);
			res.json(user);
		})
	}).catch(function(err) {
		console.log(err);
		res.send(err);
	});
});

module.exports = router;
