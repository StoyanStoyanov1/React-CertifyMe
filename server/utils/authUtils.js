const {verify} = require("jsonwebtoken");
const {SECRET} = require("../config");

exports.getUserIdFromToken = (token) => {
	try {
		const decoded = verify(token, SECRET);
		return decoded._id;
	} catch (error) {
		console.error('Error verifying token:', error);
		return null;
	}
};