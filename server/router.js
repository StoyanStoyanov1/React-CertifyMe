const router = require('express').Router();
const userController = require('./controller/userController');
const certificateController = require('./controller/certificateController');
const profilController = require('./controller/profilController');
const chatController = require('./controller/chatController');
const messageController = require('./controller/messageController')

router.use('/users', userController);
router.use('/certificates', certificateController);
router.use('/profiles', profilController)
router.use('/chat', chatController)
router.use('/message', messageController)
module.exports = router;