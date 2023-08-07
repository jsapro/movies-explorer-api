const userRouter = require('express').Router();

userRouter.get('/users/me', getUser)
userRouter.patch('/users/me', validateUser, updateUser)

module.exports = userRouter;



