const bcrypt = require('bcryptjs');
const { Users } = require('../../models');

const checkAccountAuth = async account => {
  try {
    const checkAccount = await Users.findOne({
      where: {
        account,
      },
    });
    if (checkAccount) {
      return checkAccount;
    } else {
      res.status(400).send('Account does not exit');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const checkPasswordAuth = (password, passWordUser) => {
  const checkPassword = bcrypt.compareSync(password, passWordUser);
  if (checkPassword) {
    return true;
  } else {
    return false;
  }
};

const checkNewPasswordAuth = (newPassWord, confirmPassword) => {
  if (newPassWord === confirmPassword) {
    return true;
  }
};

const updateAccount = async (account, data) => {
  console.log(data);
  await Users.update(
    { countLogin: data },
    {
      where: {
        account,
      },
    },
  );
};

module.exports = {
  checkPasswordAuth,
  checkAccountAuth,
  checkNewPasswordAuth,
  updateAccount,
};
