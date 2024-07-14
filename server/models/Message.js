const mongoose = require('mongoose');
const {text} = require("express");

const messageSchema = mongoose.Schema({

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