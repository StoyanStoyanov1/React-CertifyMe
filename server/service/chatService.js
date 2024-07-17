const Chat = require('../models/Chat');

exports.create = async (data) => await Chat.create(data);

exports.getBySenderAndReceiver = async (sender, receiver) => await Chat.findOne({$or: [
		{sender, receiver},
		{sender: receiver, receiver: sender}
	]})

exports.pushMessageIdInMessagesArray = async (chatId, messageId) => await Chat.findByIdAndUpdate(chatId, {$push: {messages: messageId}})

exports.getById = async (chatId) => await Chat.findById(chatId).lean();
