import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/profiles';

export const create = async (data) => {
	return await request('POST', baseUrl, data)
}

export const getAll = async () => {
	return await request('GET', baseUrl);
}

export const getOne = async (profilId) => {
	return await request('GET', `${baseUrl}/${profilId}/profil`);
}

export const edit = async (profilId, data) => {
	return await request('PUT', `${baseUrl}/${profilId}`, data);
}

export const getByUserId = async (userId) => {
	return await request('GET', `${baseUrl}/${userId}`)
}