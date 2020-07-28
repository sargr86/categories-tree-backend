'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    parent: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
  }, {timestamps:false});
  categories.associate = function(models) {
    models.categories.hasMany(models.categories, {
      onDelete: 'CASCADE',
      foreignKey: 'parent',
      as: 'children'
    });
  };
  return categories;
};
