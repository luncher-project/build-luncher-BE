const request = require('supertest');

const server = require('./server');
const urls = require('../consts/urls')
const responses = require('../consts/responses');

describe('server', () => {
  describe(`[GET] ${urls.test}`, () => {
    it('returns a status code of 200', () => {
      return request(server)
        .get(urls.test)
        .expect(200);
    });
    it('returns the expected response body', () => {
      return request(server)
        .get(urls.test)
        .expect(responses.test);
    });
  });
});
