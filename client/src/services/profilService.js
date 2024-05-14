import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/data/profiles';

export const create = async (data) => {
	return await request('POST', baseUrl, data)
}

export const getAll = async () => {
	return await request('GET', baseUrl);
}

export const getOne = async (profilId) => {
	return await request('GIT', `${baseUrl}/${profilId}`);
}