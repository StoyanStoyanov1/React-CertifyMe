import request from '../lib/request.js'

const baseUrl = 'https://certifyme-be.onrender.com/message';

// Function to create a new message
export const create = async (data) => {
	try {
		const message = await request('POST', `${baseUrl}/create`, {...data});
		return message;
	} catch (err) {
		console.log(err);
	}
}

// Function to get a specific message by its ID
export const getOne = async (messageId) => {
	try {
		const message = await request('GET', `${baseUrl}/get-message/${messageId}`);
		return message;
	} catch (err) {
		console.log(err);
	}
}
