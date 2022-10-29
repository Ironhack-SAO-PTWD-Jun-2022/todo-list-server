const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  // aqui vão as propriedades
  
},{ timestamps: true });

module.exports = model('Todo', todoSchema);