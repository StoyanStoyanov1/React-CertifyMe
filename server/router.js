const router = require('express').Router();
const userController = require('./controller/userController');
const certificateController = require('./controller/certificateController')
const profilController = require('./controller/profilController')

router.use('/users', userController);
router.use('/certificates', certificateController);
router.use('/profiles', profilController)

module.exports = router;