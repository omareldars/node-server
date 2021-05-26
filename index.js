const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 3000;

//init middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/image', express.static('image'));

// const app = express();
mongoose
  .connect('mongodb://localhost:27017/ecommerce', { useUnifiedTopology: true })
  .then(() => {
    console.log('connect mongodb successfully');
  })

  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// DB Error Handling
app.get((err, req, res, next) => {
  console.log(err);
  if (err.code === 11000) {
    res.status(402).send('There was a duplicate key error');
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res
      .status(422)
      .json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(400).json({ statusCode: 'Bad request' });
  }
  res.status(503).end();
});

app.use(express.json()); //middleware

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/users', userRouter);
app.use('/api/products', require('./routes/products'));
app.use('/orders', orderRouter);

app.get('/', function (req, res) {
  res.send('Hello World !!!!!');
});

app.listen(PORT, () => {
  console.info(`App is up and ready on ${PORT}`);
});
