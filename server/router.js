const router = require('express').Router();
const userController = require('./controller/userController');

router.use('/users', userController);

module.exports = router;