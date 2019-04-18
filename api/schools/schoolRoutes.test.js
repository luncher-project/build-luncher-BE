const request = require('supertest');

const server = require('../server');
const generateToken = require('../auth/generateToken');
const urls = require('../../consts/urls');
const school = require('../../consts/test-specific/school');
const users = require('../../consts/test-specific/users');
const errors = require('../../consts/errors');

describe('schoolRoutes', () => {
  describe(`[GET] ${urls.school}`, () => {
    it('returns a status code of 401 when no token is sent in Authorization header', () => {
      return request(server)
        .get(urls.school)
        .expect(401);
    });
    it('returns the expected error when no token is sent in Authorization header', () => {
      return request(server)
        .get(urls.school)
        .expect(errors.noToken);
    });
    it('returns a status code of 401 when a donor token is sent in Authorization header', () => {
      const donor = users[29];
      const token = generateToken(donor);
      return request(server)
        .get(urls.school)
        .set('Authorization', token)
        .expect(400);
    });
    it('returns the expected error when a donor token is sent in Authorization header', () => {
      const donor = users[29];
      const token = generateToken(donor);
      return request(server)
        .get(urls.school)
        .set('Authorization', token)
        .expect(errors.invalidCredentials);
    });
    it('returns a status code of 200 when a token is sent', () => {
      const unafilliatedUser = users[19];
      const token = generateToken(unafilliatedUser);
      return request(server)
        .get(urls.school)
        .set('Authorization', token)
        .expect(200);
    });
    it('returns the expected message when the admin has no associated school', () => {
      const unafilliatedUser = users[19];
      const token = generateToken(unafilliatedUser);
      return request(server)
        .get(urls.school)
        .set('Authorization', token)
        .expect(errors.noSchoolAssociated);
    });
    it('returns the school affiliated with an admin where the admin has created a school', () => {
        const affiliatedUser = users[0];
        const token = generateToken(affiliatedUser);
        return request(server)
          .get(urls.school)
          .set('Authorization', token)
          .expect(school);
      });
  });
});
