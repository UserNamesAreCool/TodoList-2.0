'use strict'
const express = require('express');
const exphbs = require('express-handlebars');
const bp = require('body-parser');
const mongoose = require('mongoose');

const todoListRender= require('./renderer/todo.js');
const todoList = require('./models/todo.js');

mongoose.connect("mongodb://localhost/todolist")

const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(bp.urlencoded({ extended: false }))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', todoListRender.main);
app.get('/del/:id', todoListRender.delete);
app.get('/update/:id', todoListRender.editPage);
app.post('/update', todoListRender.edit);
app.post('/new', todoListRender.add);
if ('todos' in db.collections) {
    app.listen(3000, () => console.log('http://localhost:3000'))
}
