const express = require('express');

const userModel = require('../models/User');
var passport = require('passport');
const {
  create,
  login,
  getAll,
  getUser,
  editOne,
  deletefield,
  getuserById,
  searchByusername,
} = require('../controllers/user');

const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await create(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

//get logined user
router.get('/me', auth, async (req, res, next) => {
  try {
    const { user: id } = req;
    const users = await getUser(id);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

// Edit your data

router.patch('/edit', auth, async (req, res, next) => {
  const {
    user: { id },
    body,
  } = req;
  try {
    const users = await editOne(id, body);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

// Remove your account
router.delete('/remove', auth, async (req, res, next) => {
  const {
    user: { id },
  } = req;
  try {
    const users = await deletefield(id);
    res.send('Delete done ');
  } catch (e) {
    next(e);
  }
});

//serch by id
router.get('/search/:_id', auth, async (req, res, next) => {
  const {
    params: { _id },
  } = req;
  try {
    const users = await getuserById({ _id });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

//search By name
router.get('/name/:username', auth, async (req, res, next) => {
  const {
    params: { username },
  } = req;
  try {
    const user = await searchByusername({ username });
    res.json(user);
    console.log(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
