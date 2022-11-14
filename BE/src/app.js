const express = require('express');
const app = express();
const dotenv = require('dotenv');
bodyParser = require('body-parser');
dotenv.config();
const todoRouter = require('./todo/todo.router')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/todo', todoRouter);

module.exports = app;