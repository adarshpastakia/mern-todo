// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software

const express = require('express');
const router = express.Router();
const errors = require('../defs/errors');

// include authorization validator
router.use(require('./_authvalidator').validator);

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (username === 'user@email.com' && password === 'password') {
    // store token against authentication user
    const token = require('./_authvalidator').addtoken(username);
    // respond with auth token
    res.json({username: req.body.username, token: token});
  } else {
    res.status(400).json(errors.INVALID_CREDENTIALS);
  }
});

router.use('/users', require('./_user'));

// return 404 when route not found
router.use('*', (req, res) => res.status(404).json(errors.UNKNOWN_ROUTE));

module.exports = router;
