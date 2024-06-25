const Profil = require('../models/Profil');

exports.create = async (profilData) => {
	await Profil.create(profilData);
};