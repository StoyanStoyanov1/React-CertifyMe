import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/certificates';

export const getAll = async () => {
	const result = await request('GET', `${baseUrl}/all-certificate`);

	return Object.values(result)
}

export const create = async (data) => {
	try {
		const result = await request('POST', `${baseUrl}/add-certificate`, {
			...data
		});

		return result;
	} catch (err) {
		console.log(err);
	}
}

export const getOne = async (cerId) => {
	const result = await request('GET', `${baseUrl}/${cerId}`);

	return result
}

export const edit = async (cerId, data) => {
	const result = await request('PUT', `${baseUrl}/${cerId}`, data);
};

export const remove = async (cerId) => {
	const result = await request('DELETE', `${baseUrl}/${cerId}`);
}