const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const urls = require('../consts/urls');
const responses = require('../consts/responses');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const userRoutes = require('./users/userRoutes');
const registerRoutes = require('./credentials/registerRoutes');

server.use(userRoutes);
server.use(registerRoutes);

/* 
[GET] no params or body required
Params: none,
Body: none,
*/
server.get(urls.test, (req, res) => {
    res.status(200).json(responses.test)
})

module.exports = server;
