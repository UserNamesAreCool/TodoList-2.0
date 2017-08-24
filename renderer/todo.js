const fs = require('fs');
const ReadWriteLock = require('rwlock');
const mongoose = require('mongoose')

const todoList = require('../models/todo.js')


const Todo = {
    main: (req, res) => {
        todoList.find().then((resp, err) => {          
            if (err) return Todo.handleError(res, err);
            res.render("list", {resp})
        })
    },

    add: (req, res) => {
        todoList.create({name: req.body.name}).then((r, err) => {
            if (err) return Todo.handleError(res, err);
            res.redirect('/')
        })
    },

    delete: (req, res) => {
        todoList.remove({_id: req.params.id}).then((result, err) => {
            if (err) return Todo.handleError(res, err);
            res.redirect('/')
        })
    },
    editPage: (req, res) => {
        todoList.findOne({_id:req.params.id}).then((r, err) => {
            if (err) return Todo.handleError(res, err);
            res.render('edit', r);
        })
    },
    edit: (req, res) => {
        name = req.body.name;
        id = mongoose.Types.ObjectId(req.body.id);
        todoList.findOneAndUpdate({_id:id}, {name}, {upsert: true}, (err, doc) => {
            if (err) return Todo.handleError(res, err);
            res.redirect('/')
        })

    },
    handleError: (res, error) => {
        let date = new Date();
        let entry = `[${date.toUTCString()}] :: ${error}`;
        fs.writeFile('./log.out', entry, (err) => {if (err) throw err;})
        res.send(500, {error})
    }

}
module.exports = Todo;
