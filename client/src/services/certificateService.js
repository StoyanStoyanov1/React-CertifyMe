import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/certificates';

// Function to get all certificates
export const getAll = async () => {
	const result = await request('GET', `${baseUrl}/all-certificate`);
	return Object.values(result);
}

// Function to create a new certificate
export const create = async (data) => {
	try {
		const certificate = await request('POST', `${baseUrl}/add-certificate`, {
			...data
		});
		return certificate;
	} catch (err) {
		console.log(err);
	}
}

// Function to get details of a specific certificate by its ID
export const getOne = async (cerId) => {
	const result = await request('GET', `${baseUrl}/${cerId}/details`);
	return result;
}

// Function to edit a specific certificate by its ID
export const edit = async (cerId, data) => {
	const result = await request('PUT', `${baseUrl}/${cerId}`, data);
	return result;
}

// Function to remove a specific certificate by its ID
export const remove = async (cerId) => {
	const result = await request('DELETE', `${baseUrl}/${cerId}`);
	return result;
}

// Function to get all certificates for a specific user by their user ID
export const getAllUserId = async (userId) => await request('GET', `${baseUrl}/${userId}`);
