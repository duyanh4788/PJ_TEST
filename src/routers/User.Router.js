const { Router } = require('express');
const { Users } = require('../../models/users');
const {
  getAllUsers,
  searchUser,
  getUserById,
  userSignUp,
} = require('../controllers/Users.controller');
const {
  checkAccountExist,
  checkPhoneExist,
} = require('../middlewares/validations/check_exist.validation');

const {
  checkEmpty,
  checkEmail,
  checkNumber,
} = require('../middlewares/validations/check_pattern.validation');

const {
  checkDefaultType,
} = require('../middlewares/validations/check_userTypeCode.validation');

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/search', searchUser);
userRouter.get('/getUserById', getUserById);
userRouter.post(
  '/signUp',
  checkAccountExist(Users),
  checkPhoneExist(Users),
  checkEmpty,
  checkEmail,
  checkNumber,
  checkDefaultType,
  userSignUp,
);
// useRouter.put('/updateUser');

module.exports = {
  userRouter,
};
