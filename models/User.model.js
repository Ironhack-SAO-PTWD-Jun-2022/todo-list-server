const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    }
  ],
},{ timestamps: true });

module.exports = model('User', userSchema);