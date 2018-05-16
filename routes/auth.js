'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/users');

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({code: 'not-found'});
  }
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({code: 'unauthorized'});
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({code: 'validation'});
  }

  User.findOne({ username })
    .populate('favorites')
    .then((user) => {
      if (!user) {
        return res.status(404).json({code: 'not-found'});
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.json(user);
      } else {
        return res.status(404).json({code: 'not-found'});
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({code: 'unauthorized'});
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({code: 'validation'});
  }

  User.findOne({username}, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({code: 'username-not-unique'});
      }

     let isAdmin = false;

      if (username === "sambossy"){
        isAdmin = true;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        username,
        password: hashPass,
        admin: isAdmin
      });

      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.json(newUser);
        });
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

// router.post('/me/favorites', (req, res, next) => {
//   if (req.session.currentUser) {
//  return res.status(401).json({code: 'unauthorized'});
//     }  // if not logged in 
//     req.session.user
//     req.body.store
  
//     User.update(user.favorites._id){
//         User.push(store._id){
//          user.favorites
//         }

//       }
    

  //update user favorites and push
  // id of user? req.session......
  // id of store? req.body.store
  // options - send the option to return the updated user as the result
  // User.update( {_id: id of user}  , {$push : { "favorites": id of store } }, options )

  // then(result) -> send user to frontend json(result)
  // catch
// })


module.exports = router;