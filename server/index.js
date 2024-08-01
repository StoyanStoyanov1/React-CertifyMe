const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 3030;

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/certify-me');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log(err))

app.use(router);

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));