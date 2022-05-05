'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewAccLogin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewAccLogin.init({
    dateLogin: DataTypes.DATE,
    accountUser: DataTypes.STRING,
    userTypeCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewAccLogin',
  });
  return NewAccLogin;
};