const Chat = require('../models/Chat');

exports.create = async (data) => await Chat.create(data);