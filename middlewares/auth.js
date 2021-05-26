const { userInfo } = require('os');
const { nextTick } = require('process');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const config = require('config');

const asyncVerify = promisify(jwt.verify);

const auth = async (req, res, next) => {
  const { headers: { authorization } } = req;
  
  if (!authorization) {
    next((new Error('UN_AUTHENTICATED')));
  }

  // user auth
  try {
    const { id } = await asyncVerify(authorization, 'SECRET_MUST_BE_COMPLEX');
    const user = await User.findById(id).exec();
    req.user = user;
    next();
  } catch (e) {
    next((new Error('UN_AUTHENTICATED')));
  }



};


module.exports = auth;
