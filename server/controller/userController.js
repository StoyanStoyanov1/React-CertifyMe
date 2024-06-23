const router = require('express').Router();
const userService = require('../service/userService');
const {} = require('../utils/errorUtils');

router.post('/register', async (req, res) => {
	try {
		const user = await userService.register(req.body);
		await user.save();
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json({message: err.message});
	}

})

module.exports = router;