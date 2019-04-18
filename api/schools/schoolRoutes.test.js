const request = require('supertest');

const db = require('../../config/knexConfig');
const server = require('../server');
const generateToken = require('../auth/generateToken');
const urls = require('../../consts/urls');
const school = require('../../consts/test-specific/school');
const users = require('../../consts/test-specific/users');
const schoolTest = require('../../consts/test-specific/newSchool');
const errors = require('../../consts/errors');

describe('schoolRoutes', () => {
  afterEach(async () => {
    await db('schools').truncate();
  });
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
  describe(`[POST] ${urls.schools}`, () => {
    it('returns a status code of 400 when an incomplete body is passed', () => {
      const admin = users[19];
      const token = generateToken(admin);
      return request(server)
        .post(urls.school)
        .set('Authorization', token)
        .send({ schoolName: 'testing high' })
        .expect(400);
    });
    it('returns the expected error when an incomplete body is passed', () => {
      const admin = users[18];
      const token = generateToken(admin);
      return request(server)
        .post(urls.school)
        .set('Authorization', token)
        .send({ schoolName: 'testing high' })
        .expect(errors.invalidSchool);
    });
    it('returns a status code of 400 when an admin already linked to a school tries to add a new one', () => {
      const admin = users[0];
      const token = generateToken(admin);
      return request(server)
        .post(urls.school)
        .set('Authorization', token)
        .expect(400);
    });
    it('returns the expected error when an admin already linked to a school tries to add a new one', () => {
      const admin = users[0];
      const token = generateToken(admin);
      return request(server)
        .post(urls.school)
        .set('Authorization', token)
        .send(schoolTest.newSchool)
        .expect(errors.secondSchool);
    });
    it('returns a status code of 201 when an unlinked admin passes a valid body', () => {
      const admin = users[18];
      const token = generateToken(admin);
      return request(server)
        .post(urls.school)
        .set('Authorization', token)
        .send(schoolTest.newSchool)
        .expect(201);
    });
    it('returns the expected school body when an unlinked admin passes a valid body', () => {
      const admin = users[18];
      const token = generateToken(admin);
      const expectedSchool = schoolTest.newSchoolReturn;
      return request(server)
        .post(urls.school)
        .set('Authorization', token)
        .send(schoolTest.newSchool)
        .expect(expectedSchool);
    });
  });
});
