const express = require("express");
const mongoose = require("mongoose");

const Todo = require("../models/todo");

const router = express.Router();

//Create a todo
router.post("/", async (req, res) => {
  const todoItem = new Todo({
    _id: new mongoose.Types.ObjectId(),
    todo: req.body.todoItem,
    completed: false,
  });

  await todoItem
    .save()
    .then(async (result) => {
      res.status(200).json({
        message: "Todo added",
        todoItem: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//List all todo items
router.get("/all", async (req, res) => {
  await Todo.find()
    .exec()
    .then(async (todos) => {
      res.status(200).json({
        message: "Todo added",
        count: todos.length,
        todoItems: todos,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//Delete a todo item
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id })
    .exec()
    .then(async (result) => {
      res.status(200).json({
        message: "Todo item deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//Update a todo item
router.patch("/:id", async (req, res) => {
  const { todo, completed } = req.body;
  await Todo.updateOne({ _id: req.params.id }, { $set: { todo, completed } })
    .exec()
    .then(async (result) => {
      res.status(200).json({
        message: "Todo item updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

module.exports = router;
