const router = require('express').Router();
const profilService = require('../service/profilService')

router.get('/:userId', async (req, res) => {
	const userId = req.params.userId;

	const profile = await profilService.getOneByUserId(userId);

	res.json(profile)
});

module.exports = router;