const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');
const bcrypt = require('bcrypt')
const {create} = require('./profilService')

exports.register = async (userData) => {
	const existingUser = await User.findOne({email: userData.email});
	if (existingUser) {
		throw new Error('User already exists');
	}

	const createdUser = await User.create({
		email: userData.email,
		password: userData.password,
		username: userData.username
	});
	await create({
			fullName: userData.fullName,
			imageUrl: userData.imageUrl,
			description: userData.description,
			userId: createdUser._id
		}
	);
	const token = await generateToken(createdUser);

	return {accessToken: token, user: createdUser};
}

exports.login = async ({email, password}) => {
	const user = await User.findOne({email});

	if (!user) {
		throw new Error('User does not exist');
	}

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		throw new Error('Invalid password');
	}

	const token = await generateToken(user);

	return {accessToken: token, user: user};
}

async function generateToken(user) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});
	return token;
}
