'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storesSchema = new Schema({
  type: String,
  name: String,
  about: String,
  picUrl: String,
  pic2Url:String
});

const Stores = mongoose.model('Stores', storesSchema);

module.exports = Stores;