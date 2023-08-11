const router = require('express').Router();
const movieRouter = require('./movies');
const userRouter = require('./user');
const { login, register } = require('../controllers/users');
const NotFoundErr = require('../utils/errors/NotFoundErr');
const auth = require('../middlewares/auth');
const {
  validateLogin,
  validateRegister,
} = require('../utils/celebrateValidation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, register);

router.use(auth);

router.use('/movies', movieRouter);
router.use('/users', userRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundErr('Такой страницы не существует'));
});

module.exports = router;
