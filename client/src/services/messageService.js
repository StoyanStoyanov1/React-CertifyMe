import request from '../lib/request.js'

const baseUrl = 'http://localhost:3030/message';

export const create = async (data) => {
	try {
		await request('POST', `${baseUrl}/create`, {...data});
	} catch (err) {
		console.log(err)
	}
}

export const getOne = async (messageId) => {
	try {
		const message = await request('GET', `${baseUrl}/get-message/${messageId}`);
		return message;
	} catch (err) {
		console.log(err);
	}
}
