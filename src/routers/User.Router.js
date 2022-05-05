const { Router } = require('express');
const { Users } = require('../../models');
const {
  getAllUsers,
  searchUser,
  getUserById,
  userSignUp,
  updateUser,
  removeUser,
} = require('../controllers/Users.controller');
const {
  checkAccountExist,
  checkPhoneExist,
  checkExist,
} = require('../middlewares/validations/check_exist.validation');

const {
  checkEmpty,
  checkNumber,
} = require('../middlewares/validations/check_pattern.validation');

const {
  checkDefaultType,
} = require('../middlewares/validations/check_userTypeCode.validation');

const {
  authenTicate,
  permissions,
} = require('../middlewares/auth/verifyToken.middleware');

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/search', searchUser);
userRouter.get('/getUserById/:id', getUserById);
userRouter.post(
  '/signUp',
  checkAccountExist(Users),
  checkPhoneExist(Users),
  checkEmpty,
  checkNumber,
  userSignUp,
);
userRouter.put(
  '/updateUser/:id',
  checkExist(Users),
  authenTicate,
  checkEmpty,
  checkNumber,
  updateUser,
);
userRouter.delete(
  '/removeUser/:id',
  authenTicate,
  permissions,
  removeUser,
);

module.exports = {
  userRouter,
};
