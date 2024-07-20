const router = require('express').Router();

const messageService = require('../service/messageService');
const chatService = require('../service/chatService');

router.post('/create', async (req,res) => {
	try {
		const data = req.body;
		const message = await messageService.create(data);

		await chatService.pushMessageIdInMessagesArray(message.chatId, message._id);

		res.status(200).json(message);

	} catch (err) {
		res.status(500).json({message: err});
	}

})

router.get('/get-message/:messageId', async (req,res) => {
	try {
		const messageId = req.params.messageId;
		const message = await messageService.getOne(messageId);

		res.status(200).json(message);

	} catch (err) {
		res.status(500).json({message: err});
	}
})

module.exports = router;