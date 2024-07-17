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

module.exports = router;