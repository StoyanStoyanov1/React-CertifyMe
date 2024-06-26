const Certificate = require('../models/Certificate');

exports.create = async (data) => await Certificate.create(data);

exports.getAllByProfilId = async (profilId) => {

		const certificate = await Certificate.find({profilId: profilId}).lean();

		return certificate;

};

exports.getAllByUserId = async (userId) => await Certificate.find({userId}).lean();

exports.getAll = async () => await Certificate.find();