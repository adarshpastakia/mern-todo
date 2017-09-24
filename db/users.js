// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software
const DbService = require('./dbservice');
const errors = require('../defs/errors');

class UsersService extends DbService {

  constructor() {
    super('users');
    this.tag = 'UsersService';
  }

  getUsers() {
    return this.queryAll();
  }

  getUser(username) {
    return this.queryOne({username});
  }

  createUser(user) {
    return new Promise((resolve, reject) => {
      let validation;

      if ((validation = validateUser(user)) !== null)
        return reject(Object.assign({}, errors.INVALID_MODEL, {message: validation}));

      return this.insert(user).then(result => resolve(result)).catch(e => reject(e));
    });
  }

  updateUser(user) {
    return new Promise((resolve, reject) => {
      let validation;

      if ((validation = validateUser(user)) !== null)
        return reject(Object.assign({}, errors.INVALID_MODEL, {message: validation}));

      return this.update(user).then(result => resolve(result)).catch(e => reject(e));
    });
  }

  deleteUser(username) {
    return this.delete({username});
  }
}

const validateUser = (model = null) => {
  if (model === null)
    return 'Empty Model';

  const {username, password, firstName, lastName} = model;

  if (!username)
    return 'Username required';
  if (!password)
    return 'Password required';
  if (password.length < 6)
    return 'Unacceptable password';
  if (!firstName)
    return 'FirstName required';
  if (!lastName)
    return 'LastName required';

  return null;
}

module.exports = new UsersService();
