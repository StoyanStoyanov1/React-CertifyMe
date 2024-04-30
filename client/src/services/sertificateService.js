import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/jsonstore/certificates';

export const getAll = async () => {
	const result = await request('GET', baseUrl);

	return Object.values(result)
}

export const create = async (data) => {
	const result = await request('POST', baseUrl, data);

	return result;
}