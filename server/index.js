const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router');

// Middleware setup
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));
app.use(express.json());

// MongoDB connection
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://blackangel9304:kC2Ob9WACFGd1dxb@cluster0.zsiluvc.mongodb.net/?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log('DB connection error:', err));

// Routes
app.use(router);

// Server setup
const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server started on port ${port}`));
