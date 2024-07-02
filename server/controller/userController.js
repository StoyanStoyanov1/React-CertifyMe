const router = require('express').Router();
const userService = require('../service/userService');
const {getErrorMessage} = require('../utils/errorUtils');

const options = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'Strict'
};

router.post('/register', async (req, res) => {
	const userData = req.body;

	try {
		const { accessToken, user } = await userService.register(userData);
		res.cookie('auth', accessToken, options);
		res.status(201).json({ accessToken, user });
	} catch (error) {
		if (error.name === 'ValidationError') {
			const errors = Object.values(error.errors).map(err => err.message);
			return res.status(400).json({ message: errors.join(', ') });
		}
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/login', async (req, res) => {
	const userData = req.body;

	try {
		const {assessToken, user} = await userService.login(userData);
		res.cookie('auth', assessToken, options);
		res.status(201).json({assessToken, user});
	} catch (err) {
		res.status(500).json({error: getErrorMessage(err)})
	}
})

router.get('/logout',  (req, res) => {
	res.clearCookie('auth');
	res.status(204).end();

})

module.exports = router;