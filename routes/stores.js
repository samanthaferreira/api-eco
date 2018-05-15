'use strict';
const express = require('express');
const router = express.Router();

const Stores = require('../models/stores');

/*GET home page*/
router.get('/stores', (req, res, next) => {
  Stores.find()
  .then((result) => {
    res.json(result);
  })
  .catch(next);
  });

  module.exports = router;