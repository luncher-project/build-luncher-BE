const request = require('supertest');

const server = require('../server');
const urls = require('../../consts/urls');
const schools = require('../../consts/test-specific/schools');
const errors = require('../../consts/errors');

describe('userRoutes', () => {
  describe(`[GET] ${urls.schools}`, () => {
    it('returns a status code of 200', () => {
      return request(server)
        .get(urls.schools)
        .expect(200);
    });
    it('returns the expected list of schools', () => {
      return request(server)
        .get(urls.schools)
        .expect(JSON.stringify(schools));
    });
  });
  describe(`[GET] ${urls.schoolByID}`, () => {
    it('returns a status code of 400 for a non-existent id', () => {
      return request(server)
        .get(`${urls.schools}/-1`)
        .expect(400);
    });
    it('returns the expected error for a non-existent id', () => {
      return request(server)
        .get(`${urls.schools}/-1`)
        .expect(errors.noSchool);
    });
    it('returns a status code of 200 for an existing id', () => {
      return request(server)
        .get(`${urls.schools}/1`)
        .expect(200);
    });
    it('returns the expected school for an existing id', () => {
      const expectedSchool = schools[0];
      delete expectedSchool.id;
      return request(server)
        .get(`${urls.schools}/1`)
        .expect(expectedSchool);
    });
  });
});
