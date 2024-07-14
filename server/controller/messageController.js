const router = require('express').Router();

const messageService = require('../service/messageService')

router.post('/create', async (req,res) => {
	try {
		const data = req.body;
		const chat = await messageService.create(data);

		res.status(200).json(chat);

	} catch (err) {
		res.status(500).json({message: err});
	}

})

module.exports = router;