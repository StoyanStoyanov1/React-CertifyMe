const Message = require('../models/Message');

exports.create = async (data) => await Message.create(data);