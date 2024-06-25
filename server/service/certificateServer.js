const Certificate = require('../models/Certificate');

exports.create = async (data) => {
	const existingCertificate = Certificate.findOne({title: data.title});

	if (existingCertificate) {
		throw new Error('Certificate already exists');
	}

	const createdCertificate = await Certificate.create(data)

	return createdCertificate;
}