const Message = require('../models/Message');

exports.create = async (data) => await Message.create(data);

exports.getOne = async (id) => await Message.findById(id);