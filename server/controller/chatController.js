const router = require('express').Router();
const chatService = require('../service/chatService')
const profilService = require('../service/profilService')

router.post('/create', async (req,res) => {
	try {
		const data = req.body;

		const chat = await chatService.create(data);

		await profilService.pushChatIdInChatArr(chat.sender, chat._id);
		await profilService.pushChatIdInChatArr(chat.receiver, chat._id);

		res.status(200).json(chat);

	} catch (err) {
		res.status(500).json({message: err});
	}

})

router.get('/find-chat', async (req, res) => {
	const { sender, receiver } = req.query;

	try {
		const chat = await chatService.getBySenderAndReceiver(sender, receiver);

		if (chat) {
			res.status(200).json(chat);
		} else {
			res.status(404).json({ message: 'Chat not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get('/get-chat/:chatId', async (req, res) => {
	const chatId = req.params.chatId;

	try {
		const chat = await chatService.getById(chatId);
		if (chat) {
			res.status(200).json(chat);
		} else {
			res.status(404).json({ message: 'Chat not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});



module.exports = router;