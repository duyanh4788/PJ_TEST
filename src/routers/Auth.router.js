const { Router } = require('express');
const {
  userSignIn,
  changePassWord,
} = require('../controllers/Auth.controller');

const authRouter = Router();

authRouter.post('/signIn', userSignIn);
authRouter.post('/changePassword', changePassWord);

module.exports = {
  authRouter,
};
