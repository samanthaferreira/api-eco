'use strict';
const express = require('express');
const router = express.Router();

const Stores = require('../models/stores');

/*GET home page*/
router.get('/', (req, res, next) => {
  Stores.find()
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  const type = req.body.type;
  const name = req.body.name;
  const about = req.body.about;
  const picUrl = req.body.picUrl;
  const pic2Url = req.body.pic2Url;

  const newStores = new Stores({type,name,about, picUrl, pic2Url});
  console.log(newStores)
  newStores.save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch(next);
});
  
  module.exports = router;