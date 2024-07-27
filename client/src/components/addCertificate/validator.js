// Validator function to validate the form values
export default function validator(values) {
	// Check if the title length is between 2 and 20 characters
	if (values.title.length < 2 || values.title.length > 20) {
		return 'title';
	}

	// Check if the start and end dates are in the correct format (dd.MM.yyyy)
	if (!/^(\d{2})\.(\d{2})\.(\d{4})$/.test(values.start) || !/^(\d{2})\.(\d{2})\.(\d{4})$/.test(values.end)) {
		return 'start';
	}

	// Parse the date parts for start and end dates
	const start = dateParts(values.start);
	const end = dateParts(values.end);

	// Check if the end date is valid (not earlier than the start date)
	if (!dateIsValid(start, end)) {
		return 'end';
	}

	// Check if the university length is between 2 and 10 characters
	if (values.university.length < 2 || values.university.length > 10) {
		return 'university';
	}

	// Check if the image URL is valid (starts with http:// or https://)
	if (values.imgUrl !== '' && !/^https?:\/\//.test(values.imgUrl)) {
		return 'imgUrl';
	}

	// Return false if all validations pass
	return false;
}

// Function to parse date parts (day, month, year) from a date string
function dateParts(date) {
	const parts = date.split('.');

	const day = parseInt(parts[0]);
	const month = parseInt(parts[1]);
	const year = parseInt(parts[2]);

	return { day, month, year };
}

// Function to check if the start date is valid compared to the end date
function dateIsValid(startDate, endDate) {
	if (startDate.year < endDate.year) return true;
	if (startDate.year > endDate.year) return false;
	if (startDate.month < endDate.month) return true;
	if (startDate.month > endDate.month) return false;
	if (startDate.day < endDate.day) return true;
	if (startDate.day >= endDate.day) return false;
}
