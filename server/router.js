const router = require('express').Router();
const userController = require('./controller/userController');
const certificateController = require('./controller/certificateController')

router.use('/users', userController);
router.use('/certificate', certificateController);

module.exports = router;