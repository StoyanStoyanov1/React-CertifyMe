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

export const getById = async (chatId) => {
	try {
		const response = await request('GET', `${baseUrl}/get-chat/${chatId}`);
		return response;

	} catch (err) {
		console.log(err)
	}
}

export const unread = async (profilId, chatId, command) => {
	try {
		const response = await request('PUT', `${baseUrl}/unread?profilId=${profilId}&chatId=${chatId}&command=${command}`);
		return response
	} catch (err) {
		console.log(err);
	}
}