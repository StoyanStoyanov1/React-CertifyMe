const router = require('express').Router();
const certificateServer = require('../service/certificateServer');

router.post('/add-certificate', async (req, res) => {
	try {
		const data = req.body;

		const certificate = await certificateServer.create(data);
		res.status(201).json(certificate);
	} catch (err) {
		res.status(500).json({message: err})
	}
});

module.exports = router;

router.get('/all-certificate', async (req, res) => {
	try {
		const certificates = await certificateServer.getAll();

		res.status(200).json(certificates);
	} catch (err) {
		res.status(500).json({message: err});
	}
})