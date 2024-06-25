const Certificate = require('../models/Certificate');

exports.create = async (data) => await Certificate.create(data);

exports.getCertificateByUserId = async (userId) => {

		const certificate = await Certificate.findById({userId}).lean();

		return certificate;

	}