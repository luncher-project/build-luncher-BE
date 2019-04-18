const request = require('supertest');

const server = require('./server');
const responses = require('../consts/responses');

describe('server', () => {
  describe('[GET] /api', () => {
    it('returns a status code of 200', () => {
      return request(server)
        .get('/api')
        .expect(200);
    });
    it('returns the expected response body', () => {
      return request(server)
        .get('/api')
        .expect(responses.test);
    });
  });
});
