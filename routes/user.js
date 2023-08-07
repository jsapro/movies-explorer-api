const userRouter = require('express').Router();

userRouter.get('/me', getUser)
userRouter.patch('/me', validateUser, updateUser)

module.exports = userRouter;



