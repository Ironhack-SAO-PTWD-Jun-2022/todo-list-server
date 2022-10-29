const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  // aqui vão as propriedades
  
},{ timestamps: true });

module.exports = model('User', userSchema);