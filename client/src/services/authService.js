import request from "../lib/request.js";

const baseUrl = 'http://localhost:3030/users';

// Function to handle user login
export const login = async (email, password) => {
	const result = await request('POST', `${baseUrl}/login`, {
		email,
		password
	});
	return result;
}

// Function to handle user registration
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

// Function to handle user logout
export const logout = () => {
	return request('GET', `${baseUrl}/logout`);
}
