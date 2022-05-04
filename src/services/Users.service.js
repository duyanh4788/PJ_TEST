const { Op } = require('sequelize');
const { Users } = require('../../models');

const findUserById = async id => {
  const userByAccount = await Users.findByPk(id);
  if (userByAccount) {
    return userByAccount;
  } else {
    return false;
  }
};

module.exports = {
  findUserById,
};
