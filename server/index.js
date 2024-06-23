const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/certify-me');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log(err))

app.post('/users/register', async (req, res) => {
	try {
		const {email, username, password} = req.body;
		const user = new User ({email, username, password});
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

app.listen(3030, () => console.log('Server started in port 3030'));