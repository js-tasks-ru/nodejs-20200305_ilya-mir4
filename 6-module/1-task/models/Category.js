const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
}, {versionKey: false});

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subcategories: [subCategorySchema],
}, {versionKey: false});

module.exports = connection.model('Category', categorySchema);
