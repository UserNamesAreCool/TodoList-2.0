'use strict'
const express = require('express');
const exphbs = require('express-handlebars');
const bp = require('body-parser');
const mongoose = require('mongoose');

const todoList= require('./renderer/todo.js');

mongoose.connect("mongodb://::1/todolist")

const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.listen(3000, () => console.log('http://localhost:3000'))
app.get('/', todoList.main);
app.post('/add', todoList.add);

