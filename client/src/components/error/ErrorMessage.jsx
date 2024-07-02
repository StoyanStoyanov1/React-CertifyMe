import React from 'react';

const ErrorMessage = ({ error }) => {
	if (!error) return null;

	return (
		<p style={{ color: 'red' }}>{error}</p>
	);
};

export default ErrorMessage;
