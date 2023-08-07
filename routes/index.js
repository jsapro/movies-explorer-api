const router = require('express').Router();
const movieRouter = require('./movies');
const userRouter = require('./user');
const { validateLogin, validateRegister} = require('../utils/celebrateValidation');

// router.post('/signup', validateLogin, login);
// router.post('/signin', validateRegister, register)

// router.use(auth); // добавить авторизацию

// router.use('/movies', movieRouter);
// router.use('/users', userRouter);

router.use('*', (req, res, next) => {
  next(new Error('Такой страницы не существует'));
})

module.exports = router;
