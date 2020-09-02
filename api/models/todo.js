const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  todo: { type: String },
  completed: { type: Boolean },
});

module.exports = mongoose.model("Todo", todoSchema);
