import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/data/certificates';

export const getAll = async () => {
	const result = await request('GET', baseUrl);

	return Object.values(result)
}