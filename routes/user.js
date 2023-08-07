const userRouter = require('express').Router();
const { validateUser } = require('../utils/celebrateValidation');

// userRouter.get('/me', getUser);
// userRouter.patch('/me', validateUser, updateUser);

module.exports = userRouter;
