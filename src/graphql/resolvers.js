const { Users } = require('../../models');
const bcrypt = require('bcryptjs');

const graphqlResolvers = {
  async user({ id }) {
    try {
      const clientDetail = await Users.findByPk(id);
      return clientDetail;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async users() {
    try {
      const clientList = await Users.findAll();
      return clientList;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async createUser({ inputUsers }) {
    const {
      account,
      passWord,
      fullName,
      birthDay,
      phone,
      isActive,
      userTypeCode,
    } = inputUsers;
    try {
      const checkAccount = await Users.findOne({
        where: {
          account,
        },
      });
      if (checkAccount) {
        throw new Error('ACCOUNT ALREADY EXIST');
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(passWord, salt);
      const newClient = await Users.create({
        account,
        passWord: hashPassword,
        fullName,
        birthDay,
        phone,
        isActive,
        userTypeCode,
      });
      return newClient;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};

module.exports = {
  graphqlResolvers,
};
