'use strict';
module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('role', {
    roleName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        role.belongsToMany(models.user, {
          through: 'userRole'
        });
        role.belongsToMany(models.permission, {
          through: 'rolePermission'
        });
      }
    }
  });
  return role;
};