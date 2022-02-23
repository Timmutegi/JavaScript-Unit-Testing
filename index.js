const express = require('express');
const app = express();

const user = require('./routes/users');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARES

app.use('/user', user);

module.exports = app;