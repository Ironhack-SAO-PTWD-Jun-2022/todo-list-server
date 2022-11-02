const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  done: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },  
},{ timestamps: true });

module.exports = model('Todo', todoSchema);