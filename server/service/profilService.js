const Profil = require('../models/Profil');

exports.create = async (profilData) => await Profil.create(profilData);

exports.getOneByUserId = async (userId) => await Profil.findOne({userId}).lean();

exports.getAll = async () => await Profil.find().lean();

exports.pushCertificateInCertificatesList = async (userId, certificateId) => await Profil.findByIdAndUpdate(userId, {$push: {certificates: certificateId}});

exports.edit = async (profilId, data) => await Profil.findByIdAndUpdate(profilId, data, {new: true});

exports.getOne = async (profilId) => await Profil.findById(profilId).lean();

exports.getTopThree = async () => await Profil.aggregate([
	{
		$addFields: {
			likesCount: { $size: "$likes" }
		}
	},
	{
		$sort: { likesCount: -1 }
	},
	{
		$limit: 3
	}]);
