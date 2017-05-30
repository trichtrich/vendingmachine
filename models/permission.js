'use strict';
module.exports = function(sequelize, DataTypes) {
  var permission = sequelize.define('permission', {
    permissionName: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        permission.belongsToMany(models.role, {
          through: 'rolePermission'
        });
      }
    }
  });
  return permission;
};