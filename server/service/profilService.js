const Profil = require('../models/Profil');
const Certificate = require("../models/Certificate");

exports.create = async (profilData) => await Profil.create(profilData);

exports.getOneByUserId = async (userId) => await Profil.findOne({userId}).lean();

exports.getAll = async () => await Profil.find().lean();

exports.pushCertificateInCertificatesList = async (userId, certificateId) => await Profil.findByIdAndUpdate(userId, {$push: {certificates: certificateId}});

exports.edit = async (profilId, data) => await Profil.findByIdAndUpdate(profilId, data, {new: true});
