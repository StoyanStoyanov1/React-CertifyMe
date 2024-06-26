const Certificate = require('../models/Certificate');

exports.create = async (data) => await Certificate.create(data);

exports.getAllByProfilId = async (profilId) => {

		const certificate = await Certificate.find({profilId: profilId}).lean();

		return certificate;

};

exports.getAllByUserId = async (userId) => await Certificate.find({userId}).lean();

exports.getAll = async () => await Certificate.find();

exports.getOne = async (certificateId) => await Certificate.findById(certificateId).lean();

exports.edit = async (certificateId, data) => await Certificate.findByIdAndUpdate(certificateId, data, {new: true})