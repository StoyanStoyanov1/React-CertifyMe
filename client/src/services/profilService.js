import request from "../lib/request.js";

const baseUrl = 'https://certifyme-be.onrender.com/profiles';

// Function to create a new profile
export const create = async (data) => {
	return await request('POST', baseUrl, data);
}

// Function to get all profiles
export const getAll = async () => {
	return await request('GET', baseUrl);
}

// Function to get a specific profile by its ID
export const getOne = async (profilId) => {
	return await request('GET', `${baseUrl}/${profilId}/profil`);
}

// Function to edit a specific profile by its ID
export const edit = async (profilId, data) => {
	return await request('PUT', `${baseUrl}/${profilId}`, data);
}

// Function to get a profile by user ID
export const getByUserId = async (userId) => {
	return await request('GET', `${baseUrl}/${userId}`);
}

// Function to get the top three profiles
export const getTopThree = async () => {
	return await request('GET', `${baseUrl}/profiles/top-3`);
}
