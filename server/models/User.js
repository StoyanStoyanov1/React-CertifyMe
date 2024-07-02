const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return value.length > 2 && value.length < 10;
			},
			message: 'Username must be between 2 and 10 characters!'

		}
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(value);
			},
			message: (props) => `${props.value} is not a valid email!`
		}
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return value.length > 6
			},
			message: 'Passwort must be least 6 characters!'
		}
	},

}, {timestamps: true})

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
	}

	next();
})

userSchema.virtual('rePassword')
.set(function (value) {
	if (value !== this.password) {
		throw new Error('Passwords do not match');
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;