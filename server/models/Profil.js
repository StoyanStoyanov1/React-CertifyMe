const mongoose = require('mongoose');

const profilSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	certificates: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Certificate",
	}]
});

const Profil = mongoose.model('Profil', profilSchema);

module.exports = Profil;