import React from 'react';

const ErrorMessage = ({ error }) => {
	if (!error) return null;

	const errorMessages = error.split(', ');

	return (
		<div style={{ color: 'red' }}>
			{errorMessages.map((message, index) => (
				<p key={index}>{message}</p>
			))}
		</div>
	);
};

export default ErrorMessage;
