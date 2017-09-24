// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software

const request = require("request");
const baseUrl = "http://localhost:8080/api"

describe("Make API calls", () => {
  let creds;

  describe("Call authenticate", () => {
    it("returns status code 400", (done) => {
      request.post(`${baseUrl}/login`, (error, response, body) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });
    it("returns status code 200", (done) => {
      request.post({
        url: `${baseUrl}/login`,
        json: {
          username: 'user@email.com',
          password: 'password'
        }
      }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        creds = Buffer
          .from(`user@email.com:${body.token}`)
          .toString('base64');
        done();
      });
    });
  });

  describe("Call authenticated route", () => {
    it("returns status code 401", (done) => {
      request.get(`${baseUrl}/user`, (error, response, body) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
    it("returns status code 200", (done) => {
      request.get({
        url: `${baseUrl}/user`,
        'headers': {
          'authorization': `Basic ${creds}`
        }
      }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

  });
});
