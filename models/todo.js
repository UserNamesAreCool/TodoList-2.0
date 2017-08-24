const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {type: String, required: true, unique: true, trim: true},
    info: {creationDate: {type: Date, default: Date.now}} // Incase more info is to be added
}) 

module.exports = mongoose.model('todos', todoSchema);
