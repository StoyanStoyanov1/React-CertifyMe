import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
	const result = await request('POST', `${baseUrl}/login`, {
		email,
		password
	});
	return result;
}

export const register = async (email, password, username, fullName, imageUrl, description) => {
	const result = await request('POST', `${baseUrl}/register`, {
		email,
		username,
		password,
		fullName,
		imageUrl,
		description,
	});
	return result;
}

export const logout = () => {
	return request('GET', `${baseUrl}/logout`);
}
