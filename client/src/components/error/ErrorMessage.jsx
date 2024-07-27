import React from 'react';

// Component to display error messages
const ErrorMessage = ({ error }) => {
	// If there is no error, return null to render nothing
	if (!error) return null;

	// Split the error string into an array of individual error messages
	const errorMessages = error.split(', ');

	return (
		<div className='error-message'>
			{errorMessages.map((message, index) => (
				// Render each error message as a paragraph element
				<p key={index}>{message}</p>
			))}
		</div>
	);
};

export default ErrorMessage;
