const router = require('express').Router();
const chatService = require('../service/chatService')

router.post('/create', async (req,res) => {
	try {
		const data = req.body;

		const chat = await chatService.create(data);

		res.status(200).json(chat);

	} catch (err) {
		res.status(500).json({message: err});
	}

})

module.exports = router;