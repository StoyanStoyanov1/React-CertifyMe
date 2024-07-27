// Function to build request options including headers and body
const buildOptions = (data) => {
	const options = {};

	// If data is provided, set the body and content-type header
	if (data) {
		options.body = JSON.stringify(data);
		options.headers = {'content-type': 'application/json'};
	}

	// Get the token from localStorage and add it to the headers
	const token = localStorage.getItem('accessToken');
	if (token) {
		options.headers = {
			...options.headers,
			'X-Authorization': token
		};
	}

	return options;
}

// Function to make an HTTP request
export default async function request(method, url, data) {
	// Make the fetch request with the provided method, url, and options
	const response = await fetch(url, {
		method,
		credentials: 'include',
		...buildOptions(data)
	});

	// If the response status is 204 (No Content), return an empty object
	if (response.status === 204) {
		return {};
	}

	// Parse the JSON response
	const result = await response.json();

	// If the response is not ok, throw an error with the result
	if (!response.ok) {
		throw result;
	}

	// Return the result
	return result;
}
