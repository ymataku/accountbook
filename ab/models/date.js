'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class date extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  date.init({
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    day: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'date',
  });
  return date;
};