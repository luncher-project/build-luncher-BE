const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = db;
