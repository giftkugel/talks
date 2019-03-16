const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const serverTiming = require('server-timing');

const longtask = require('./routes/longtask');
const shorttask = require('./routes/shorttask');

const app = express();

app.use(serverTiming());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'docs')));

app.use('/longtask', longtask);
app.use('/shorttask', shorttask);

module.exports = app;
