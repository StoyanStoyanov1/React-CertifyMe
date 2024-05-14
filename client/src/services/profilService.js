import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/data/profiles';

export const create = async (data) => {
	return await request('POST', baseUrl, data)
}