const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const cors = require('cors');
const router = require('./router');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:5174',
	credentials: true
}));

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/certify-me');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log(err))

app.use(router);

app.listen(3030, () => console.log('Server started in port 3030'));