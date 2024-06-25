const router = require('express').Router();
const userService = require('../service/userService');
const {getErrorMessage} = require('../utils/errorUtils');

router.post('/register', async (req, res) => {
	const userData = req.body;

	try {
		const { accessToken, user } = await userService.register(userData);
		res.cookie('auth', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Strict'
		});
		res.status(201).json({ accessToken, user });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
});


router.get('/logout', async (req, res) => {


})

module.exports = router;