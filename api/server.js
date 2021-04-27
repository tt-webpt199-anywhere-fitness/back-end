const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./errorHandler');

// ?? ==> routers
const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');
const courseRouter = require('./courses/course-router');
const locationRouter = require('./locations/location-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// ?? ==> server.use(routers)
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/courses', courseRouter);
server.use('/api/locations', locationRouter);

server.use(errorHandler);

module.exports = server;
