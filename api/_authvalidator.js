// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software
const errors = require('../defs/errors');

const uuid = require('uuid');

// maintain authenticated tokens, preferably should be persisted to db
const tokens = {
  test: '6631106f-cf7f-4f77-9da6-1700223357af'
};
const addtoken = (username) => {
  return tokens[username] = uuid.v4();
}
const validate = (username, token) => {
  return tokens[username] === token;
}
// list of routes to bypass authorization check
const ignoreApi = ['/login', '/register']
const validator = (req, res, next) => {
  console.info('Requesting:', req.path);

  if (ignoreApi.indexOf(req.path) === -1) {
    const auth = req.headers['authorization'] || 'undefined';
    if (auth === 'undefined' || auth === 'null')
      return res.status(401).json(errors.UNAUTHORIZED);

    // check authorization header
    const creds = new Buffer(auth.split(' ').pop(), 'base64').toString('ascii').split(':');

    if (!validate(creds[0], creds[1]))
      return res.status(401).json(errors.UNAUTHORIZED);
    }

  next();
};

module.exports = {
  addtoken,
  validator
}
