const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');
const bcrypt = require('bcrypt');

exports.register = async (userData) => {

	const user = await User.findOne({email: userData.email});

	if (user) {
		throw new Error('User already exists');
	}

	const createUser = await User.create(userData);

	const token = await generateToken(createUser);

	return token;


}

async function generateToken(user) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = await jwt.sign(payload, SECRET, { expiresIn: '2h'});

	return token

}