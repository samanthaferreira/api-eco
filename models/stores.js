'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storesSchema = new Schema({
  type: String,
  name: String,
  picUrl: String,
  about: String
});

const Stores = mongoose.model('Stores', storesSchema);

module.exports = Stores;