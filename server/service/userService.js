const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

exports.register = async (userData) => {
	const existingUser = await User.findOne({ email: userData.email });
	if (existingUser) {
		throw new Error('User already exists');
	}

	const createdUser = await User.create(userData);
	const token = await generateToken(createdUser);

	return { accessToken: token, user: createdUser };
}


async function generateToken(user) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });
	return token;
}
