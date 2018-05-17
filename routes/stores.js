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
  const newData = {
    type: req.body.type,
    name: req.body.name,
    about: req.body.about,
    address: req.body.address,
    phone: req.body.phone,
    picUrl: req.body.picUrl,
    pic2Url: req.body.pic2Url,
    pic3Url: req.body.pic3Url,
    takeMe: req.body.takeMe
  }

  const newStores = new Stores(newData);
  console.log(newStores)
  newStores.save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Stores.findById(req.params.id)
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});




  module.exports = router;