const Chat = require('../models/Chat');

exports.create = async (data) => await Chat.create(data);

exports.getBySenderAndReceiver = async (sender, receiver) => await Chat.findOne({$or: [
		{sender, receiver},
		{sender: receiver, receiver: sender}
	]})

exports.getById = async (chatId) => await Chat.findById(chatId).lean();
