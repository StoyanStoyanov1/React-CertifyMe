const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	start: {
		type: String,
		require: true,
	},
	end: {
		type: String,
		require: true,
	},
	university: {
		type: String,
		require: true,
	},
	imgUrl: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	profilId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profil",
	}
})

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;