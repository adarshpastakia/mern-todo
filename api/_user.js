// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software
const UsersService = require('../db').UsersService;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  UsersService.getUsers().then(result => res.status(200).json(result)).catch(e => res.status(404).json(e));
});
router.get('/:id', (req, res) => {
  UsersService.getUser(req.params.id).then(result => res.status(200).json(result)).catch(e => res.status(404).json(e));
});

module.exports = router;
