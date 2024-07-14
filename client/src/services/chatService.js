import request from '../lib/request.js';

const baseUrl = 'http://localhost:3030/chat';

export const create = async (data) => {
	try {
		await request('POST', `${baseUrl}/create`, {...data});
	} catch (err) {
		console.log(err)
	}
}