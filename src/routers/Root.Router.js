const { Router } = require('express');
const { authRouter } = require('./Auth.router');
const { userRouter } = require('./User.Router');

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/user', userRouter);

module.exports = {
  rootRouter,
};
