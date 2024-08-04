const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));

app.use(express.json());

const dbURI = process.env.MONGODB_URI || 'mongodb+srv://blackangel9304:kC2Ob9WACFGd1dxb@cluster0.zsiluvc.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log(err));

app.use(router);

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server started on port ${port}`));
