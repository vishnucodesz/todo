const knex = require('knex');
const config = require('./knexfile')
const knexInstance = knex(config.developement);

module.exports = knexInstance;