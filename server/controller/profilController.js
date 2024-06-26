const router = require('express').Router();
const profilService = require('../service/profilService')

router.get('/:userId', async (req, res) => {
	const userId = req.params.userId;
	try {
		const profile = await profilService.getOneByUserId(userId);

		res.json(profile)
	} catch (err) {
		res.status(500).json({message: 'No found profil!'})
	}
});

router.get('/', async (req, res) => {
	try {
		const profiles = await profilService.getAll();

		res.json(profiles);
	} catch (err) {
		res.status(500).json({message: 'No found profiles!'})
	}
})

module.exports = router;