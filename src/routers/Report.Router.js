const { Router } = require('express');
const {
  authenTicate,
  permissions,
} = require('../middlewares/auth/verifyToken.middleware');
const {
  reportUserLogin,
  searchNewListReport,
  getNewUserLogin,
  searchListReport,
  getCountLoginAccountByDate,
} = require('../controllers/Report.controller');

const reportRouter = Router();

reportRouter.get(
  '/getNewUserLogin',
  authenTicate,
  permissions,
  getNewUserLogin,
);

reportRouter.get(
  '/searchNewListReport',
  authenTicate,
  permissions,
  searchNewListReport,
);

reportRouter.get(
  '/reportUserLogin',
  authenTicate,
  permissions,
  reportUserLogin,
);

reportRouter.get(
  '/searchListReport',
  authenTicate,
  permissions,
  searchListReport,
);

reportRouter.get(
  '/getCountLoginAccount',
  authenTicate,
  permissions,
  getCountLoginAccountByDate,
);

module.exports = {
  reportRouter,
};
