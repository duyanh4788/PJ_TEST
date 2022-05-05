const jwt = require('jsonwebtoken');
const { USER_TYPE_CODE, SECRETKEY } = require('../../utils/common_constants');
const authenTicate = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    const deCode = jwt.verify(token, SECRETKEY);
    req.account = deCode;
    next();
  } catch (error) {
    res.status(400).send('Your are not sign in');
  }
};

const permissions = (req, res, next) => {
  try {
    const { account } = req;
    if (
      USER_TYPE_CODE.includes(account.userTypeCode) &&
      account !== parseInt(req.params.account)
    ) {
      next();
    } else {
      res.status(400).send('Your Are note permissions remove account');
    }
  } catch (error) {
    res.status(400).send('Your Are note permissions remove account');
  }
};

module.exports = {
  authenTicate,
  permissions,
};
