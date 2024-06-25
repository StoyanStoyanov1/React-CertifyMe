const Profil = require('../models/Profil');

exports.create = async (profilData) => await Profil.create(profilData);

exports.getOneByUserId = async (userId) => await Profil.findOne({userId}).lean();