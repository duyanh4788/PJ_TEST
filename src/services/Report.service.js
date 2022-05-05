const { CountLogin, NewAccLogin } = require('../../models');

const findAccountExit = async account => {
  const checkAccount = await NewAccLogin.findOne({
    where: {
      accountUser: account,
    },
  });
  if (checkAccount) {
    return true;
  } else {
    return false;
  }
};

const createAccountLoginReport = async ({ account, userTypeCode }) => {
  await CountLogin.create({
    dateLogin: new Date(),
    accountUser: account,
    userTypeCode: userTypeCode,
  });
  const checkAccountReport = await findAccountExit(account);
  if (!checkAccountReport) {
    await NewAccLogin.create({
      dateLogin: new Date(),
      accountUser: account,
      userTypeCode: userTypeCode,
    });
  }
};

module.exports = {
  findAccountExit,
  createAccountLoginReport,
};
