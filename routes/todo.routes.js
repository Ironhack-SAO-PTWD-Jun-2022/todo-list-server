const router = require('express').Router();
const { throwError } = require('../utils/error.utils');

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
      throwError('Falta descrição.', 400);
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
      throwError('Descrição não pode ser vazia.', 400);
    }

    await Todo.findByIdAndUpdate(todoId, { description });

    res.status(200).json({ message: `Tarefa ${todoId} atualizada: ${description}`});
  } catch (error) {
    next(error);
  }
});

router.put('/done/:todoId', async (req, res, next) => {
  const { todoId } = req.params;
  const { done } = req.body;
  try {
    if (typeof done !== 'boolean') {
      throwError('Tipo de informação não é válida.', 400);
    }
    const todoFromDB = await Todo.findByIdAndUpdate(todoId, { done }, { new: true });
    res.status(200).json(todoFromDB);
  } catch (error) {
    next(error);
  }
});

router.delete('/:todoId', async (req, res, next) => {
  const userId = req.payload._id;
  const { todoId } = req.params;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { todos: todoId } });
    await Todo.findByIdAndRemove(todoId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;