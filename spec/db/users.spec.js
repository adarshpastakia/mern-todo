// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software

const userService = require("../../db/users");

describe("Make UserService calls", () => {
  const newUser = {
    username: 'jon@email.com',
    password: 'Jon#182',
    firstName: 'Jon',
    lastName: 'Jacob',
    phone: ''
  }

  describe("Call createUser", () => {
    it("returns empty model error", (done) => {
      console.info("Expecting 'Empty Model' error")
      userService.createUser().then(() => {
        done();
      }).catch(e => {
        expect(e.message).toBe('Empty Model');
        done();
      });
    });
    it("returns validation error", (done) => {
      console.info("Expecting 'Username required' error")
      userService.createUser({}).then(() => {
        done();
      }).catch(e => {
        expect(e.message).toBe('Username required');
        done();
      });
    });
    it("returns created user", (done) => {
      console.info("Expecting created user model")
      userService.createUser(newUser).then(result => {
        // console.info(resul/t);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.username).toBe(newUser.username);
        done();
      }).catch(e => {
        console.info(e);
        expect(e).toBe(null);
        done();
      });
    });
    it("returns all users", (done) => {
      console.info("Expecting all user models")
      userService.getUsers().then(result => {
        expect(result).not.toBeNull();
        expect(result.length).not.toBe(0);
        done();
      }).catch(e => {
        console.info(e);
        expect(e).toBe(null);
        done();
      });
    });
    it("returns single user", (done) => {
      console.info("Expecting single user model")
      userService.getUser(newUser.username).then(result => {
        expect(result).not.toBeNull();
        expect(result.username).toBe(newUser.username);
        done();
      }).catch(e => {
        console.info(e);
        expect(e).toBe(null);
        done();
      });
    });
    it("returns deleted true", (done) => {
      console.info("Expecting delete user model")
      userService.deleteUser(newUser.username).then(result => {
        expect(result).toBe(true);
        done();
      }).catch(e => {
        console.info(e);
        expect(e).toBe(null);
        done();
      });
    });
  });
});
