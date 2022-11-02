const router = require('express').Router();

const User = require('../models/User.model');
const Todo = require('../models/Todo.model');

router.get('/', async (req, res, next) => {
  const userId = req.payload._id;
  const { done } = req.query;
  try {
    const filter = { userId };
    if (done) {
      filter.done = done === 'yes';
    }
    const todoListFromDB = await Todo.find(filter);
    res.status(200).json(todoListFromDB);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const userId = req.payload._id;
  const { description } = req.body;
  try {
    if (!description) {
      const error = new Error('Falta descrição.')
      error.status = 400;
      throw error;
    }

    const todoFromDB = await Todo.create({description, userId});
    await User.findByIdAndUpdate(userId, { $push: { todos: todoFromDB._id }});
    res.status(201).json(todoFromDB);
  } catch (error) {
    next(error);
  }
});

router.put('/edit/:todoId', async (req, res, next) => {
  const { todoId } = req.params;
  const { description } = req.body;
  try {
    if (!description) {
      const error = new Error('Descrição não pode ser vazia.');
      error.status = 400;
      throw error;
    }

    await Todo.findByIdAndUpdate(todoId, { description });

    res.status(200).json({ message: `Tarefa ${todoId} atualizada: ${description}`});
  } catch (error) {
    next(error);
  }
});

router.put('/toggle-done/:todoId', async (req, res, next) => {
  const { todoId } = req.params;
  try {
    const todoFromDB = await Todo.findByIdAndUpdate(todoId, [{ $set: { done: { $not: "$done" }}}], { new: true });
    res.status(200).json(todoFromDB);
  } catch (error) {
    next(error);
  }
});

router.delete('/:todoId', async (req, res, next) => {
  const { todoId } = req.params;
  try {
    await Todo.findByIdAndRemove(todoId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;