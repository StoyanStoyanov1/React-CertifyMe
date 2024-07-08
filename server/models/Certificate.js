const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
	title: {
		type: String,
		require: true,
		validator: {
			validate: (value) => {
				return value.length > 2 && value.length < 20;
			},
			message: 'Title must be between 2 and 20 characters!'
		}
	},
	start: {
		type: String,
		require: true,
		validate: {
			validator: (value) => {
				return  /^(\d{2})\.(\d{2})\.(\d{4})$/.test(value);
			},
			message: 'Date is not a valid Format, muss be dd.MM.yyyy!'
		}
	},
	end: {
		type: String,
		require: true,
		validate: {
			validator: (value) => {
				return  /^(\d{2})\.(\d{2})\.(\d{4})$/.test(value);
			},
			message: 'Date is not a valid Format, muss be dd.MM.yyyy!'
		}
	},
	university: {
		type: String,
		require: true,
		validate: {
			validator: (value) => {
				return value.length > 2 && value.length < 10;
			},
			message: 'University muss be between 2 and 10 characters!'
		}
	},
	imgUrl: {
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
		require: true,
	},
	profilId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profil",
	},

}, {timestamps: true})



const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;