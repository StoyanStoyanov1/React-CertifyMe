const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(3030, () => console.log('Server started in port 3030'));