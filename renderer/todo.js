const fs = require('fs');
const ReadWriteLock = require('rwlock');

const todoList = require('../models/todo.js')


const Todo = {
    main: (req, res) => {
        todoList.find({}, (err, resp) => {
            console.log('Error: '+ err)
            console.log('RESP: ' + resp)
            if (err) return this.handleError(err);
            res.render("list", resp)
        }) 
    },

    add: (req, res) => {
        TodoList.create({name: req.body.name}, (err, r) => {
            if (err) return this.handleError(err);
        })
        res.redirect('/')
    },

    delete: (req, res) => {
        TodoList.remove(req.body.id).exec((err, result) => {
            if (err) return this.handleError(err);
            res.redirect('/')
        })
    },
    handleError: err => {
        let date = new Date();
        let entry = `[${date.toUTCString()}] :: ${err}`;
        fs.writeFile('./log.out', entry, (err) => {if (err) throw err;})
        res.render('error', {time: date.toUTCString()})
    }

}
module.exports = Todo;
