import request from '../lib/request.js';

const baseUrl = 'http://localhost:3030/chat';

export const create = async (data) => {
	try {
		await request('POST', `${baseUrl}/create`, {...data});
	} catch (err) {
		console.log(err)
	}
}

export const getBySenderAndReceiver = async (sender, receiver) => {
	try {
		const response = await request('GET', `${baseUrl}/find-chat?sender=${sender}&receiver=${receiver}`);
		return response;
	} catch (err) {
		console.log(err);
	}
}