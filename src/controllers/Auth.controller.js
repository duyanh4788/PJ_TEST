const {
  checkAccountAuth,
  checkPasswordAuth,
  checkNewPasswordAuth,
} = require('../services/Auth.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRETKEY } = require('../utils/common_constants');
const { Users } = require('../../models');

const userSignIn = async (req, res) => {
  const { account, passWord } = req.body;
  try {
    const checkAccount = await checkAccountAuth(account);
    checkPasswordAuth(passWord, checkAccount.passWord);
    const data = {
      account: checkAccount.account,
      phone: checkAccount.phone,
      userTypeCode: checkAccount.userTypeCode,
    };
    const token = jwt.sign(data, SECRETKEY, { expiresIn: 86400000 });
    res.status(200).send({
      message: 'Login succesFully',
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const changePassWord = async (req, res) => {
  const { account, passWord, newPassword, confirmPassword } = req.body;
  try {
    const checkAccount = await checkAccountAuth(account);
    const isCheckPassWord = checkPasswordAuth(passWord, checkAccount.passWord);
    if (!isCheckPassWord) {
      return res.status(400).send('Password is wrong');
    }
    const newPasswordIsCheck = checkNewPasswordAuth(
      newPassword,
      confirmPassword,
    );
    if (newPasswordIsCheck) {
      const salt = bcrypt.genSaltSync(10);
      const hassPassword = bcrypt.hashSync(newPassword, salt);
      await Users.update(
        { passWord: hassPassword },
        {
          where: {
            account,
          },
        },
      );
      console.log(data1);
      const data = {
        account: checkAccount.account,
        phone: checkAccount.phone,
        userTypeCode: checkAccount.userTypeCode,
      };
      const token = jwt.sign(data, SECRETKEY, { expiresIn: 86400000 });
      res.status(200).send({
        message: 'Change password succesFully',
        token,
      });
    } else {
      res.status(400).send('New password && Confirm password not match');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  userSignIn,
  changePassWord,
};
