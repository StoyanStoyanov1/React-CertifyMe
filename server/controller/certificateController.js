const router = require('express').Router();
const certificateServer = require('../service/certificateServer');

router.post('/add-certificate', async (req, res) => {
	const data = req.body;

	const certificate = await certificateServer.create(data);

	return certificate;
});

module.exports = router;