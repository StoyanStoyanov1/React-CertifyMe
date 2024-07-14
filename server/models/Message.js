const mongoose = require('mongoose');
const {text} = require("express");

const messageSchema = mongoose.Schema({
	message: {
		type: String,
		require: true,
		validator: {
			validate: (value) => {
				return value.length > 0 && value.length < 200;
			},
			message: 'Title must be between 0 and 200 characters!'
		}
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	}

}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;