const request = require('supertest');

const server = require('../server');
const generateToken = require('../auth/generateToken');
const urls = require('../../consts/urls');
const users = require('../../consts/test-specific/users');
const errors = require('../../consts/errors');

describe('userRoutes', () => {
  describe(`[PUT] ${urls.donor}`, () => {
    it('returns a status code of 401 when no token is sent in Authorization header', () => {
      return request(server)
        .put(urls.donor)
        .expect(401);
    });
    it('returns the expected error when no token is sent in Authorization header', () => {
      return request(server)
        .put(urls.donor)
        .expect(errors.noToken);
    });
    it('returns a status code of 401 when an admin token is sent in Authorization header', () => {
      const admin = users[0];
      const token = generateToken(admin);
      return request(server)
        .put(urls.donor)
        .set('Authorization', token)
        .expect(400);
    });
    it('returns the expected error when an admin token is sent in Authorization header', () => {
      const admin = users[0];
      const token = generateToken(admin);
      return request(server)
        .put(urls.donor)
        .set('Authorization', token)
        .expect(errors.invalidCredentials);
    });
    it('returns a status code of 400 when invalid update fields are passed', () => {
      const donor = users[29];
      const token = generateToken(donor);
      return request(server)
        .put(urls.donor)
        .set('Authorization', token)
        .send({ id: 30 })
        .expect(400);
    });
    it('returns the expected error message when invalid update fields are passed', () => {
      const donor = users[29];
      const token = generateToken(donor);
      return request(server)
        .put(urls.donor)
        .set('Authorization', token)
        .send({ id: 30 })
        .expect(errors.invalidDonorUpdate);
    });
    it('returns a status code of 200 when a valid update is requested', () => {
      const donor = users[29];
      const token = generateToken(donor);
      return request(server)
        .put(urls.donor)
        .set('Authorization', token)
        .send({ lastName: 'test' })
        .expect(200);
    });
    it('returns the expected user object when a valid update is requested', () => {
      const donor = users[29];
      const token = generateToken(donor);
      const lastNameTest = 'Test';
      const expectedDonor = donor;
      expectedDonor.lastName = lastNameTest;
      delete expectedDonor.password;
      return request(server)
        .put(urls.donor)
        .set('Authorization', token)
        .send({ lastName: lastNameTest })
        .expect(expectedDonor);
    });
  });
});