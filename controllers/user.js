const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);


const create = (user) => User.create(user);
//login user
const login = async ({ username, password }) => {
  const user = await User.findOne({ username }).exec(); // get user from db by using fondone in mongoose
  if (!user) {

      throw Error('Not_AUTHNTICATED');

  }
  console.log(user);
  const isValidPass = user.validatePassword(password);

  if (!isValidPass) {
      throw Error('Not_AUTHNTICATED');

  }
  const token = await asyncSign({
      username: user.username,
      id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
  return { ...user.toJSON(), token };
};


// get all user in system
const getAll = () => User.find({}).exec();

//get logined user
const getUser = (id) => User.findById(id);

//user edit his data 
const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();
//user delet the account
const deletefield = (id) => User.findByIdAndRemove(id).exec();
//search By id
const getuserById = (id) => User.findById(id).exec();

//serarch By Name
const searchByusername = ({ username }) => User.findOne({ username }).exec();

module.exports = {
  create,
  login,
  getAll,
  getUser,
  editOne,
  deletefield,
  getuserById,
  searchByusername,
 
};
