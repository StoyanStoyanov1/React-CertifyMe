const router = require('express').Router();
const profilService = require('../service/profilService')
const certificateServer = require("../service/certificateServer");

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

router.put('/:profilId', async (req, res) => {
	try {
		const profilId = req.params.profilId;
		const data = req.body;

		const profil = await profilService.edit(profilId, data);


		res.status(200).json(profil);
	} catch (err) {
		res.status(500).json({message: 'Profil is not found!'});
	}
})

module.exports = router;