const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const urls = require('../consts/urls');
const responses = require('../consts/responses');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

/* 
[GET] no params or body required
*/
server.get(urls.test, (req, res) => {
    res.status(200).json(responses.test)
})


module.exports = server;
