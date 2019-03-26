/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  section: String,
  url: {
    type: String,
    unique: true,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
