const userRouter = require('express').Router();
const { validateUser } = require('../utils/celebrateValidation');
const { getUser, updateUser } = require('../controllers/users');

userRouter.get('/me', getUser);
userRouter.patch('/me', validateUser, updateUser);

module.exports = userRouter;
