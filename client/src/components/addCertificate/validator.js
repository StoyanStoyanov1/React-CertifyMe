export default function validator(values) {
	if (values.title.length < 2 || values.title.length > 12) {
		return 'title';
	}

	if (!/^(\d{2})\.(\d{2})\.(\d{4})$/.test(values.start) || !/^(\d{2})\.(\d{2})\.(\d{4})$/.test(values.end)) {
		return 'start';
	}
	const start = dateParts(values.start);
	const end = dateParts(values.end);

	if (!dateIsValid(start, end)) {
		return 'end';
	}

	if (values.university.length < 2 || values.university.length > 10) {
		return 'university';
	}

	if (values.imgUrl !== '' && !/^https?:\/\//.test(values.imgUrl)) {
		return 'imgUrl'
	}

	return false;

}

function dateParts(date) {
	const parts = date.split('.');

	const day = parseInt(parts[0]);
	const month = parseInt(parts[1]);
	const year = parseInt(parts[2]);

	return {day,month,year};
}

function dateIsValid(startDate, endDate) {

	if (startDate.year < endDate.year) return true;

	if (startDate.year > endDate.year) return false;

	if (startDate.month < endDate.month) return true;

	if (startDate.month > endDate.month) return false;

	if (startDate.day < endDate.day) return true;

	if (startDate.day >= endDate.day) return false;
}