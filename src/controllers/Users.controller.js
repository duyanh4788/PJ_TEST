const { Op } = require('sequelize');
const { Users } = require('../../models');
const { findUserById } = require('../services/Users.service');
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
          [Op.like]: `%${req.query.account}%`,
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
    const { account, passWord, fullName, birthDay, phone } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(passWord, salt);
    const newUser = await Users.create({
      account,
      passWord: hashPassword,
      fullName,
      birthDay,
      phone,
      isActive: true,
      userTypeCode: 'USER',
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
    const { fullName, birthDay, phone } = req.body;
    const value = { fullName, birthDay, phone };
    const { id } = req.params;
    await Users.update(value, {
      where: {
        id,
      },
    });
    const updateUser = await findUserById(id);
    if (updateUser) {
      res.status(200).send(updateUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.status(200).send('Remove Account Success');
    } else {
      res.status(500).send('Account does not exist');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllUsers,
  searchUser,
  getUserById,
  userSignUp,
  updateUser,
  removeUser,
};
