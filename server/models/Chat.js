const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profil",
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profil",
	},
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Message",
	}]
}, {timestamps: true});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;