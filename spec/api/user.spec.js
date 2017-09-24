// @author: Adarsh Pastakia
// Copyright © 2017, Innominds Software

const request = require("request");
const baseUrl = "http://localhost:8080/api/users"

const creds = Buffer.from(`test:6631106f-cf7f-4f77-9da6-1700223357af`).toString('base64');

describe("Make API calls", () => {
  describe("Get /", () => {
    it("returns list", (done) => {
      request.get({
        url: `${baseUrl}/`,
        'headers': {
          'authorization': `Basic ${creds}`
        }
      }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(body).not.toBe(null);
        expect(body.length).not.toBe(0);
        done();
      });
    });
  });
  describe("Get /", () => {
    it("returns list", (done) => {
      request.get({
        url: `${baseUrl}/`,
        'headers': {
          'authorization': `Basic ${creds}`
        }
      }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(body).not.toBe(null);
        expect(body.length).not.toBe(0);
        done();
      });
    });
  });
});
