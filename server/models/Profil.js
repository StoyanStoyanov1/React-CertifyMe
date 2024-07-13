const mongoose = require('mongoose');

const profilSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		validate: {
			validator: (value) => {
				if (value === '') {
					return true;
				}
				return /^https?:\/\//.test(value)
			},
			message: 'Url must start with http:// or https://'
		}
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
	}],
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}],
	chats: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Message",
	}],
	createdChatsWith: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profil",
	}

}, {timestamps: true})

const Profil = mongoose.model('Profil', profilSchema);

module.exports = Profil;