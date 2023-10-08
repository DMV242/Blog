const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: false,
  },

  categories: [String],
});

exports.articleModel = mongoose.model("article", articleSchema);
