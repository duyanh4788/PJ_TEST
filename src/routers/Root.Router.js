const { Router } = require('express');
const { authRouter } = require('./Auth.router');
const { userRouter } = require('./User.Router');
const { reportRouter } = require('./Report.Router');

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/user', userRouter);
rootRouter.use('/report', reportRouter);

module.exports = {
  rootRouter,
};
