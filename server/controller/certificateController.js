const router = require('express').Router();
const certificateServer = require('../service/certificateServer');
const {getErrorMessage} = require('../utils/errorUtils')

router.post('/add-certificate', async (req, res) => {
	const data = req.body;

	try {
		 await certificateServer.create(data);
		 res.status(200);
	} catch (err) {
		res.status(500).json({error: getErrorMessage(err)});
	}
})

module.exports = router;