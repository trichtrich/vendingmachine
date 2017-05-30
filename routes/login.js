var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  var userName = req.body.userName;
  var passWord = req.body.passWord;

	models.user.findOne({
		include: [{
			model: models.role,
			include: [{
				model: models.permission
			}]
		}],
	where: { userName: userName, passWord: passWord }
	}).then(function(user) {
    var roles = [];
		var permissions = [];
		for (i in user.roles) {
      roles.push({
        id: user.roles[i].id,
        roleName: user.roles[i].name
      });
			for (j in user.roles[i].permissions) {
        var permissionIds = permissions.map(permission => permission.id);
				if (permissionIds.indexOf(user.roles[i].permissions[j].id) == -1) {
					permissions.push({
            id: user.roles[i].permissions[j].id,
            permissionName: user.roles[i].permissions[j].permissionName,
            path: user.roles[i].permissions[j].path
          });
				}
			}
		}

		req.session.user = {
			id: user.id,
      roles: roles,
			permissions: permissions
		};
		res.redirect('/admin');
	})
});

module.exports = router;
