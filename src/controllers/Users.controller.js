const { Users } = require('../../models/users');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const data = await Users.findAll();
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchUser = async (req, res) => {
  try {
    const data = await Users.findAll({
      where: {
        account: {
          [Op.likẽ]: `%${res.query.account}%`,
        },
      },
    });
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const data = await Users.findByPk(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const userSignUp = async (req, res) => {
  try {
    const {
      account,
      passWord,
      fullName,
      birthDay,
      phone,
      isActive,
      userTypeCode,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(passWord, salt);
    const newUser = await Users.create({
      account,
      passWord: hashPassword,
      fullName,
      birthDay,
      phone,
      isActive,
      userTypeCode,
    });
    if (newUser) {
      return res.status(200).send(newUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { account, fullName, birthDay, phone, isActive, userTypeCode } =
      req.body;
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllUsers,
  searchUser,
  getUserById,
  userSignUp,
};
