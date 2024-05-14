import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
	const result = await request('POST', `${baseUrl}/login`, {
		email,
		password
	});

	return result
}

export const register = (email, password,  accName) => request('POST', `${baseUrl}/register`, {
	email,
	accName,
	password,
});

export const logout = () => {
	return request('GET', `${baseUrl}/logout`);
}