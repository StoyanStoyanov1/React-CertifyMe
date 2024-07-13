const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
	title: {
		type: String,
		require: true,
		validator: {
			validate: (value) => {
				return value.length > 2 && value.length < 20;
			},
			message: 'Title must be between 2 and 20 characters'
		}
	},
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