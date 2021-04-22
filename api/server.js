const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./errorHandler');

// TODO ==> routers
const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// TODO ==> server.use(routers)
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.use(errorHandler);

module.exports = server;
